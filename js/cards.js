// FUNÇÕES DE CRIAÇÃO DOS CARDS
// Cada função recebe um objeto de carro e retorna um bloco de HTML pronto para
// ser inserido na página com insertAdjacentHTML.

/**
 * Cria o card de um veículo para a seção "Ofertas em destaque".
 * Exibe imagem, nome, tipo, quilometragem, combustível, preço e link de detalhes.
 */
function createFeaturedCarCard(car) {
  return `
    <li class="vehicle-card">
      <figure>
        <img src="${car.img}" alt="${car.name}" loading="lazy" />
      </figure>

      <div class="card-content">
        <h3>${car.name}</h3>
        <p>${car.type} • ${car.km} km • ${car.fuel}</p>
        <strong>${formatPrice(car.price)}</strong>
        <a href="car-details.html?id=${car.id}" class="btn btn-outline">
          Ver detalhes
        </a>
      </div>
    </li>
  `;
}

/**
 * Cria o card compacto usado na área "Carros mais baratos" do hero.
 * O primeiro item (index 0) recebe a etiqueta "Menor preço"; os demais, "Oferta".
 */
function createBestPriceCard(car, index) {
  const tag = index === 0 ? "Menor preço" : "Oferta";

  return `
    <article class="best-price-card">
      <figure>
        <img src="${car.img}" alt="${car.name}" />
      </figure>

      <div class="best-price-info">
        <p class="tag">${tag}</p>
        <h4>${car.name}</h4>
        <p>${car.type} • ${car.km} km • ${car.fuel}</p>
        <strong>${formatPrice(car.price)}</strong>
        <a href="car-details.html?id=${car.id}" class="best-price-link">
          Ver detalhes
        </a>
      </div>
    </article>
  `;
}
