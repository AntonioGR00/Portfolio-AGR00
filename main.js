import emailjs from '@emailjs/browser';

// Inicializar EmailJS
emailjs.init("MbnpcM3OeBN-ik_v8");

// Estado de navegación
let currentPage = 1; // 1 = página 1, 2 = página 2, 3 = página 3

// Elementos del DOM
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

// Función para cambiar de página
function changePage(pageNum) {
  // Remover clase active de todas las páginas
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Agregar clase active a la página actual
  const targetPage = document.getElementById(`page${pageNum}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Actualizar estado de los botones
  prevBtn.disabled = pageNum === 1;
  nextBtn.disabled = pageNum === 3;
}

// Event listeners para botones de navegación
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < 3) {
    currentPage++;
    changePage(currentPage);
  }
});

// Inicializar vista
changePage(currentPage);

// MANEJO DEL FORMULARIO DE CONTACTO
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Email al usuario
  emailjs.send("service_18r81hu", "template_jt9nevb", {
    from_name: name,
    from_email: email,
    message: message,
    to_email: email
  }).then(
    function (response) {
      statusMsg.textContent = "¡Mensaje enviado exitosamente!";
      statusMsg.style.color = "green";
      contactForm.reset();
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
