// RENDERIZAÇÃO DOS CARROS NA TELA
// Funções responsáveis por limpar e repopular as grades de veículos no DOM.

/**
 * Filtra e exibe os carros na grade principal ("Ofertas em destaque").
 * Aplica simultaneamente o filtro de categoria (selecionada via pills) e
 * o filtro de busca (texto digitado no campo de pesquisa).
 * Exibe a mensagem "nenhum resultado" quando nenhum carro passa pelos filtros.
 *
 * @param {Array}       cars             - Lista completa de carros normalizada.
 * @param {string}      selectedCategory - Categoria ativa; string vazia exibe todos.
 * @param {HTMLElement} searchInput      - Campo de texto da busca.
 * @param {HTMLElement} cardGrid         - Elemento <ul> onde os cards são inseridos.
 * @param {HTMLElement} noResultsMessage - Parágrafo exibido quando não há resultados.
 */
function renderFilteredCars(cars, selectedCategory, searchInput, cardGrid, noResultsMessage) {
  const searchTerm = normalizeText(searchInput.value);

  cardGrid.innerHTML = "";

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      !searchTerm ||
      normalizeText(`${car.name} ${car.type} ${car.fuel}`).includes(searchTerm);

    const matchesCat = !selectedCategory ||
      normalizeText(car.type) === normalizeText(selectedCategory);

    return matchesCat && matchesSearch;
  });

  filteredCars.forEach((car) => {
    cardGrid.insertAdjacentHTML("beforeend", createFeaturedCarCard(car));
  });

  noResultsMessage.hidden = filteredCars.length > 0;
}

/**
 * Exibe os 2 carros com menor preço na área "Carros mais baratos" do hero.
 * A lista é ordenada por preço crescente e fatiada nos dois primeiros itens.
 *
 * @param {Array}       cars         - Lista completa de carros normalizada.
 * @param {HTMLElement} bestPriceGrid - Container onde os cards compactos são inseridos.
 */
function renderCheapestCars(cars, bestPriceGrid) {
  bestPriceGrid.innerHTML = "";

  const cheapestCars = [...cars]
    .sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price))
    .slice(0, 2);

  cheapestCars.forEach((car, index) => {
    bestPriceGrid.insertAdjacentHTML("beforeend", createBestPriceCard(car, index));
  });
}
