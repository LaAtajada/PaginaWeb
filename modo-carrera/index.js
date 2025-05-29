// /modo-carrera/index.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".academies-grid");

  fetch("https://laatajada.wuaze.com/api/get_academias.php")
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        container.innerHTML = `<p class="text-white text-center">Error: ${data.error}</p>`;
        return;
      }

      // Limpia contenido inicial
      container.innerHTML = "";

      data.forEach(academy => {
        const card = document.createElement("div");
        card.className = "academy-card";

        card.innerHTML = `
          <div class="academy-logo">
            <img src="/images/Logos/LogoAtajadaSolo.svg" alt="${academy.nombre} logo">
          </div>
          <h2>${academy.nombre}</h2>
          <a href="academia.html?id=${academy.id}" class="academy-button">Ver porteros</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = `<p class="text-white text-center">Hubo un error al cargar las academias.</p>`;
      console.error(err);
    });
});
