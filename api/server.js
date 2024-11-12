require("dotenv").config();
const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const nodemailer = require(`nodemailer`);
const mongoose = require(`mongoose`);
const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: `gmail`,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error:`, err);
    process.exit(1);
  });

// Define Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model(`Contact`, contactSchema);

// Add Contact Message to Database and Send Mail
app.post(`/api/contact`, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });

    await newContact.save();
    // Sending Mail (Owner)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_COPY,
      subject: `Enquiry from ${name} | Melted Scoop`,
      text: `Hello Vishnu,
       ${message}

      Name: ${name}
      Email: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    // Sending Mail (Replay)
    const mailOptions2 = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Enquiry | Melted Scoop`,
      text: `Hello ${name},

       We have received your message. our executive will get back to you in 24 hours.
       Review Your Message :
            ${message}
      Vishnu Thangaraj
      info@vedhanthitech.com
      6383 580 365`,
    };

    await transporter.sendMail(mailOptions2);
    res.status(200).json({
      message: `Contact saved and email sent successfully`,
      success: true,
    });
  } catch (error) {
    console.error(`Error processing contact form:`, error);
    res.status(500).json({
      error: `An error occurred while processing your request`,
      success: false,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
