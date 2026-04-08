import emailjs from "@emailjs/browser";

// EmailJS Initialization
emailjs.init({
  publicKey: "MbnpcM3OeBN-ik_v8"
});

let currentPage = 2;
const savedLanguage = localStorage.getItem("portfolioLanguage") || "es";
let currentLanguage = savedLanguage;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const prevLabel = prevBtn ? prevBtn.querySelector(".label") : null;
const nextLabel = nextBtn ? nextBtn.querySelector(".label") : null;
const languageSelect = document.getElementById("languageSelect");
const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

const translations = {
  es: {
    nav: {
      personal: "Información personal",
      projects: "Proyectos y contacto"
    },
    navDestinations: {
      1: "Información personal",
      2: "Proyectos y contacto"
    },
    about: {
      title: "Sobre mí",
      personalInfo: "Información Personal",
      nameLabel: "Nombre:",
      roleLabel: "Profesión:",
      roleValue: "Desarrollador Aplicaciones Multiplataforma / Web / Software / Diseñador",
      locationLabel: "Ubicación:",
      locationValue: "Cádiz, Andalucía, España",
      bioTitle: "Biografía",
      bioText: "¡Hola! Soy Antonio Gross Rivero, desarrollador freelance de software, actualmente enfocado en seguir creciendo profesionalmente mientras construyo proyectos propios y colaboro en soluciones digitales a medida.<br><br>En los últimos meses he centrado mi trabajo en reforzar mis habilidades técnicas, desarrollar aplicaciones reales y crear contenido educativo sobre programación, donde comparto conocimientos, procesos y aprendizajes de forma constante.<br><br>Me apasiona crear productos funcionales, bien estructurados y pensados para aportar valor real, combinando desarrollo, aprendizaje continuo y divulgación técnica.<br><br><strong>¡Nunca dejes de programar!</strong>",
      skillsTitle: "Habilidades"
    },
    hero: {
      greeting: "Hola, soy",
      subtitle: "Desarrollador Aplicaciones Multiplataforma / Web / Software / Diseñador"
    },
    projects: {
      title: "Proyectos & Empresas",
      project1Title: "TaskManager",
      project1Desc: "App Android minimalista para gestionar tareas con CRUD, SQLite y recordatorios inteligentes.",
      project2Title: "Learning",
      project2Desc: "Plataforma escolar full-stack con Next.js, NestJS, Prisma, PostgreSQL y mensajería en tiempo real.",
      project3Title: "PubtoGo",
      project3Desc: "Proyecto orientado a servicios y experiencias digitales, disponible en tu perfil de GitHub.",
      viewAllGithub: "Ver todos en GitHub"
    },
    contact: {
      title: "Contacto",
      namePlaceholder: "Nombre",
      emailPlaceholder: "Email",
      messagePlaceholder: "Mensaje",
      submit: "Enviar",
      success: "¡Mensaje enviado exitosamente!"
    },
    footer: {
      rights: "© 2026 AGR00. Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      personal: "Personal information",
      projects: "Projects and contact"
    },
    navDestinations: {
      1: "Personal information",
      2: "Projects and contact"
    },
    about: {
      title: "About me",
      personalInfo: "Personal Information",
      nameLabel: "Name:",
      roleLabel: "Role:",
      roleValue: "Multiplatform App / Web / Software Developer / Designer",
      locationLabel: "Location:",
      locationValue: "Cadiz, Andalusia, Spain",
      bioTitle: "Biography",
      bioText: "Hi! I'm Antonio Gross Rivero, a freelance software developer currently focused on continuing to grow professionally while building my own projects and collaborating on tailored digital solutions.<br><br>In recent months, I have focused my work on strengthening my technical skills, developing real applications, and creating educational programming content where I consistently share knowledge, processes, and lessons learned.<br><br>I am passionate about creating functional, well-structured products designed to deliver real value by combining development, continuous learning, and technical outreach.<br><br><strong>Never stop coding!</strong>",
      skillsTitle: "Skills"
    },
    hero: {
      greeting: "Hi, I'm",
      subtitle: "Multiplatform App / Web / Software Developer / Designer"
    },
    projects: {
      title: "Projects & Companies",
      project1Title: "TaskManager",
      project1Desc: "Minimalist Android app to manage tasks with CRUD, SQLite, and smart reminders.",
      project2Title: "Learning",
      project2Desc: "Full-stack school platform with Next.js, NestJS, Prisma, PostgreSQL, and real-time messaging.",
      project3Title: "PubtoGo",
      project3Desc: "Project focused on services and digital experiences, available on your GitHub profile.",
      viewAllGithub: "View all on GitHub"
    },
    contact: {
      title: "Contact",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submit: "Send",
      success: "Message sent successfully!"
    },
    footer: {
      rights: "© 2026 AGR00. All rights reserved."
    }
  }
};

function resolveTranslation(path) {
  return path.split(".").reduce((accumulator, key) => (accumulator ? accumulator[key] : undefined), translations[currentLanguage]);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translated = resolveTranslation(key);
    if (translated) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    const translated = resolveTranslation(key);
    if (translated) {
      element.innerHTML = translated;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translated = resolveTranslation(key);
    if (translated) {
      element.setAttribute("placeholder", translated);
    }
  });
}

function changePage(pageNum) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(`page${pageNum}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  const isFirstPage = pageNum === 1;
  const isLastPage = pageNum === 2;

  prevBtn.disabled = isFirstPage;
  nextBtn.disabled = isLastPage;
  prevBtn.classList.toggle("is-hidden", isFirstPage);
  nextBtn.classList.toggle("is-hidden", isLastPage);

  const pageNames = translations[currentLanguage].navDestinations;
  const prevDestination = pageNames[pageNum - 1] || "";
  const nextDestination = pageNames[pageNum + 1] || "";

  if (prevLabel) {
    prevLabel.textContent = prevDestination;
  }

  if (nextLabel) {
    nextLabel.textContent = nextDestination;
  }

  const goToText = currentLanguage === "es" ? "Ir a" : "Go to";
  prevBtn.setAttribute("aria-label", prevDestination ? `${goToText} ${prevDestination}` : "");
  nextBtn.setAttribute("aria-label", nextDestination ? `${goToText} ${nextDestination}` : "");
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < 2) {
    currentPage++;
    changePage(currentPage);
  }
});

if (languageSelect) {
  languageSelect.value = currentLanguage;
  languageSelect.addEventListener("change", (event) => {
    currentLanguage = event.target.value;
    localStorage.setItem("portfolioLanguage", currentLanguage);
    applyTranslations();
    changePage(currentPage);
  });
}

applyTranslations();
changePage(currentPage);

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate form
    if (!name || !email || !message) {
      statusMsg.textContent =
        currentLanguage === "es"
          ? "Por favor completa todos los campos"
          : "Please fill in all fields";
      statusMsg.style.color = "red";
      return;
    }

    // Get current time
    const currentTime = new Date().toLocaleString(
      currentLanguage === "es" ? "es-ES" : "en-US"
    );

    // Contact Us Email (to admin)
    const contactUsParams = {
      name: name,
      from_email: email,
      time: currentTime,
      message: message
    };

    // Auto-Reply Email (to user)
    const autoReplyParams = {
      to_email: email,
      name: name
    };

    // Send both emails
    Promise.all([
      emailjs.send("service_18r81hu", "template_2qejkar", contactUsParams),
      emailjs.send("service_18r81hu", "template_jt9nevb", autoReplyParams)
    ])
      .then(() => {
        statusMsg.textContent = translations[currentLanguage].contact.success;
        statusMsg.style.color = "green";
        contactForm.reset();
        setTimeout(() => {
          statusMsg.textContent = "";
        }, 3000);
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        statusMsg.textContent =
          currentLanguage === "es"
            ? "Error al enviar el mensaje. Intenta de nuevo."
            : "Error sending message. Please try again.";
        statusMsg.style.color = "red";
      });
  });
}
