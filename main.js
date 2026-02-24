// Estado de navegación
let currentPage = 2; // Página inicial: 2 (centro)

// Elementos del DOM
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const prevLabel = prevBtn ? prevBtn.querySelector(".label") : null;
const nextLabel = nextBtn ? nextBtn.querySelector(".label") : null;
const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

const pageNames = {
  1: "Información personal",
  2: "Proyectos y contacto",
  3: "Creación de contenido"
};

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

  // Actualizar textos y accesibilidad según destino real
  const prevDestination = pageNames[pageNum - 1] || pageNames[1];
  const nextDestination = pageNames[pageNum + 1] || pageNames[3];

  if (prevLabel) {
    prevLabel.textContent = prevDestination;
  }

  if (nextLabel) {
    nextLabel.textContent = nextDestination;
  }

  prevBtn.setAttribute("aria-label", `Ir a ${prevDestination}`);
  nextBtn.setAttribute("aria-label", `Ir a ${nextDestination}`);
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
