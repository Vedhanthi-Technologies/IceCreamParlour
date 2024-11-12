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
const date1 = document.getElementById("date1");
const date2 = document.getElementById("date2");
const time1 = document.getElementById("time1");
const time2 = document.getElementById("time2");
const phone1 = document.getElementById("phone1");
const phone2 = document.getElementById("phone2");
const fname1 = document.getElementById("fname1");
const fname2 = document.getElementById("fname2");
const lname1 = document.getElementById("lname1");
const lname2 = document.getElementById("lname2");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");

function reservation1() {
  const input1 = [fname1, lname1, date1, time1, phone1, message1];
  let validation = false;

  input1.forEach((target) => {
    if (target.value === "") {
      validation = true;
    }
  });

  if (validation) {
    return alert("All Fields are Required");
  }

  button1.disabled = true;
  button1.value = "Booking ...";

  fetch(`${localhost}/api/booking`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname: fname1.value,
      lname: lname1.value,
      date: date1.value,
      time: time1.value,
      phone: phone1.value,
      message: message1.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Booking made Successfully !");
      } else {
        alert("Unable to Make Booking, Try Again !");
      }
      button1.value = "Make Reservation";
      window.location.href = "/index.html";
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
}

function reservation2() {
  const input2 = [fname2, lname2, date2, time2, phone2, message2];
  let validation = false;

  input2.forEach((target) => {
    if (target.value === "") {
      validation = true;
    }
  });

  if (validation) {
    return alert("All Fields are Required");
  }

  button2.disabled = true;
  button2.value = "Booking ...";

  fetch(`${localhost}/api/booking`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname: fname2.value,
      lname: lname2.value,
      date: date2.value,
      time: time2.value,
      phone: phone2.value,
      message: message2.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Booking made Successfully !");
      } else {
        alert("Unable to Make Booking, Try Again !");
      }
      button2.value = "Make Reservation";
      window.location.href = "/index.html";
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
}
