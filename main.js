import emailjs from '@emailjs/browser';

emailjs.init("MbnpcM3OeBN-ik_v8");

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_18r81hu", "template_jt9nevb", {
    from_name: name,
    from_email: email,
    message: message,
    to_email: "antoniogross18@gmail.com"
  }).then(
    function (response) {
      statusMsg.textContent = "¡Mensaje enviado exitosamente!";
      statusMsg.style.color = "green";
      form.reset();
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 3000);
    },
    function (error) {
      statusMsg.textContent = "Error al enviar el mensaje. Intenta de nuevo.";
      statusMsg.style.color = "red";
      console.error("Error:", error);
    }
  );
});
