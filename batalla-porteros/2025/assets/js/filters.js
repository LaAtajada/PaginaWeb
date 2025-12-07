// filters.js - Filtros por nombre y categoría para jugadores.html

// Utilidad: normalizar texto (minúsculas y sin tildes)
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const categoriaSelect = document.getElementById("filter-categoria");
  const cards = Array.from(document.querySelectorAll(".card-player"));

  function aplicarFiltros() {
    const searchValue = normalizeText(searchInput.value.trim());
    const categoriaValue = categoriaSelect.value; // Infantil, Juvenil, Elite o ""

    cards.forEach((card) => {
      const name = normalizeText(card.dataset.name || "");
      const categoria = card.dataset.categoria || "";

      // Filtro por nombre: que incluya lo que se escribe
      const coincideNombre =
        searchValue === "" || name.includes(searchValue);

      // Filtro por categoría: si select vacío, acepta todas
      const coincideCategoria =
        categoriaValue === "" || categoria === categoriaValue;

      // Mostrar/ocultar
      if (coincideNombre && coincideCategoria) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Eventos
  if (searchInput) {
    searchInput.addEventListener("input", aplicarFiltros);
  }

  if (categoriaSelect) {
    categoriaSelect.addEventListener("change", aplicarFiltros);
  }
});
