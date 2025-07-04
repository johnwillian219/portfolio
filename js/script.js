document.addEventListener("DOMContentLoaded", function () {
  // Menu mobile
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Mudar navbar ao scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Ativar link ativo no menu
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Formulário de contato
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação simples
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      let isValid = true;

      if (name.value.trim() === "") {
        showError(name, "Por favor, insira seu nome");
        isValid = false;
      } else {
        showSuccess(name);
      }

      if (email.value.trim() === "") {
        showError(email, "Por favor, insira seu email");
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Por favor, insira um email válido");
        isValid = false;
      } else {
        showSuccess(email);
      }

      if (message.value.trim() === "") {
        showError(message, "Por favor, insira sua mensagem");
        isValid = false;
      } else {
        showSuccess(message);
      }

      if (isValid) {
        // Simular envio do formulário
        alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    if (!small) {
      const errorElement = document.createElement("small");
      errorElement.innerText = message;
      formGroup.appendChild(errorElement);
    } else {
      small.innerText = message;
    }
  }

  function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
    const small = formGroup.querySelector("small");
    if (small) {
      small.remove();
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Toggle de tema claro/escuro
  const themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.setAttribute(
        "data-theme",
        document.body.getAttribute("data-theme") === "light" ? "dark" : "light"
      );

      // Atualizar ícone
      const icon = this.querySelector("i");
      if (document.body.getAttribute("data-theme") === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }

      // Salvar preferência no localStorage
      localStorage.setItem("theme", document.body.getAttribute("data-theme"));
    });

    // Verificar preferência salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.setAttribute("data-theme", savedTheme);
      const icon = themeToggle.querySelector("i");
      if (savedTheme === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    }
  }

  // Atualizar ano no footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Animações de scroll
  function initScrollAnimations() {
    const elements = document.querySelectorAll("[data-aos]");

    function checkPosition() {
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();

        // Se o elemento estiver visível na janela
        if (position.top < window.innerHeight - 100 && position.bottom >= 0) {
          element.classList.add("aos-animate");
        }
      });
    }

    // Verificar posição ao carregar e ao scrollar
    window.addEventListener("load", checkPosition);
    window.addEventListener("scroll", checkPosition);
    checkPosition(); // Verificar inicialmente
  }

  initScrollAnimations();
});
