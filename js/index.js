// SELEÇÃO DOS ELEMENTOS DO HTML
// Referências aos elementos do DOM usados pelos eventos e funções de renderização.
const cardGrid = document.querySelector(".card-grid");
const bestPriceGrid = document.querySelector("#best-price-grid");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#home-search");
const categoryLinks = document.querySelectorAll(".category-list a");
const noResultsMessage = document.querySelector("#no-results-message");
const openAddCarPopupButton = document.querySelector("#open-add-car-popup");

// ESTADO DA PÁGINA
// Variáveis que controlam quais carros estão carregados e qual categoria está ativa.
let cars = [];
let selectedCategory = "";

// FUNÇÕES DE EVENTO
// Cada função configura os listeners de um grupo de elementos interativos.

/**
 * Atualiza a grade principal aplicando os filtros ativos de categoria e busca.
 * Chamada sempre que o usuário interage com a busca ou as categorias.
 */
function refresh() {
  renderFilteredCars(cars, selectedCategory, searchInput, cardGrid, noResultsMessage);
}

/**
 * Ativa os eventos do formulário de busca:
 * - submit: quando o usuário clica no botão "Buscar";
 * - input: enquanto o usuário digita no campo de busca.
 */
function setupSearchEvents() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    refresh();
  });

  searchInput.addEventListener("input", refresh);
}

/**
 * Ativa o evento de clique em cada link de categoria.
 * Atualiza a categoria ativa e re-renderiza os cards filtrados.
 */
function setupCategoryEvents() {
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      selectedCategory = link.dataset.category || "";
      refresh();
    });
  });
}

// POPUP DE CADASTRO DE CARRO
// Abre uma nova janela menor com o formulário de adicionar carro.

/**
 * Liga o botão "Adicionar Novo Carro" à abertura do popup com add-car.html.
 */
function setupPopupEvent() {
  openAddCarPopupButton.addEventListener("click", () => {
    window.open(
      "add-car.html",
      "Adicionar Carro",
      "width=500,height=600,resizable=yes,scrollbars=yes,top=100,left=100"
    );
  });
}

// INICIALIZAÇÃO DA PÁGINA
// Executa todas as funções necessárias assim que o arquivo é carregado.

/**
 * Ponto de entrada da página.
 * Carrega os carros, renderiza as duas grades e registra todos os eventos.
 */
function initPage() {
  cars = loadCars();
  refresh();
  renderCheapestCars(cars, bestPriceGrid);
  setupSearchEvents();
  setupCategoryEvents();
  setupPopupEvent();
}

initPage();
