document.addEventListener("DOMContentLoaded", function () {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const textArray = [
    "Desenvolvedor Front-End",
    "Entusiasta em Cibersegurança",
    "Apaixonado por Tecnologia",
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay entre textos
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Iniciar animação
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
