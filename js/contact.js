const localhost = "http://localhost:3005";

// CONTACT //
const contact_name = document.getElementById("contactname");
const contact_email = document.getElementById("contactemail");
const contact_btn = document.getElementById("contactbutton");
const contact_message = document.getElementById("contactmessage");
const contact_subject = document.getElementById("contactsubject");

function checkInput() {
  const inputs = [
    contact_name,
    contact_email,
    contact_message,
    contact_subject,
  ];
  let validation = false;

  inputs.forEach((target) => {
    if (target.value === "") {
      validation = true;
    }
  });

  if (validation) {
    return alert("All Fields are Required");
  }

  contact_btn.disabled = true;
  contact_btn.value = "Sending ...";

  fetch(`${localhost}/api/contact`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contact_name.value,
      email: contact_email.value,
      subject: contact_subject.value,
      message: contact_message.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Message Sent Successfully !");
      } else {
        alert("Unable to Send Message, Try Again !");
      }
      contact_btn.value = "Send Message";
      window.location.href = "/contact.html";
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
}

// BOOKING //
