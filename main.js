// Estado de navegación
let currentPage = 1;

// Elementos del DOM
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

// Función para cambiar de página
function changePage(pageNum) {
  console.log("Cambiando a página:", pageNum);
  
  // Remover clase active de todas las páginas
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Agregar clase active a la página actual
  const targetPage = document.getElementById(`page${pageNum}`);
  if (targetPage) {
    targetPage.classList.add("active");
    console.log("Página", pageNum, "activada");
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
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Aquí pueden ir los emails con EmailJS
    statusMsg.textContent = "¡Mensaje enviado exitosamente!";
    statusMsg.style.color = "green";
    contactForm.reset();
    setTimeout(() => {
      statusMsg.textContent = "";
    }, 3000);
  });
}
