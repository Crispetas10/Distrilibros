const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();

const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".book-card")];
const count = document.querySelector("#bookCount");
const noResults = document.querySelector("#noResults");
let activeFilter = "todos";

function updateCatalog() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  let visible = 0;
  cards.forEach(card => {
    const title = card.dataset.title.toLocaleLowerCase("es");
    const category = card.dataset.category;
    const matchesQuery = title.includes(query);
    const matchesFilter = activeFilter === "todos" || category.split(" ").includes(activeFilter);
    const show = matchesQuery && matchesFilter;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  count.textContent = `${visible} ${visible === 1 ? "título" : "títulos"}`;
  noResults.hidden = visible !== 0;
}
searchInput.addEventListener("input", updateCatalog);
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  updateCatalog();
}));
