document.addEventListener("DOMContentLoaded", () => {
  const detailsContainer = document.getElementById("car-details");

  if (!detailsContainer) {
    console.error("Container car-details não encontrado.");
    return;
  }

  const defaultCars = [
    {
      id: 1,
      name: "Honda Civic Touring 2022",
      brand: "Honda",
      model: "Civic Touring",
      type: "Sedan",
      year: "2022",
      km: "32.000",
      fuel: "Flex",
      transmission: "Automático",
      color: "Vermelho",
      location: "São Paulo - SP",
      price: "149.900",
      description:
        "Sedan premium com pacote completo de segurança, ótimo desempenho e interior confortável.",
      img: "../uploads/carro1.jpg"
    },
    {
      id: 2,
      name: "Jeep Compass Limited 2021",
      brand: "Jeep",
      model: "Compass Limited",
      type: "SUV",
      year: "2021",
      km: "41.500",
      fuel: "Diesel",
      transmission: "Automático",
      color: "Branco",
      location: "Campinas - SP",
      price: "169.900",
      description:
        "SUV robusto, confortável, com acabamento premium e excelente desempenho para cidade e estrada.",
      img: "../uploads/carro2.jpeg"
    },
    {
      id: 3,
      name: "Volkswagen Polo Highline 2023",
      brand: "Volkswagen",
      model: "Polo Highline",
      type: "Hatch",
      year: "2023",
      km: "12.400",
      fuel: "Flex",
      transmission: "Automático",
      color: "Branco",
      location: "Curitiba - PR",
      price: "108.500",
      description:
        "Hatch moderno, econômico, com motor eficiente e pacote tecnológico completo.",
      img: "../uploads/carro3.jpg"
    }
  ];

  const storedCars = JSON.parse(localStorage.getItem("cars")) || [];

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const id = Number(params.get("id"));

  let selectedCar = null;

  if (type === "default") {
    selectedCar = defaultCars.find((car) => car.id === id);
  }

  if (type === "stored") {
    selectedCar = storedCars[id];
  }

  if (!selectedCar) {
    detailsContainer.innerHTML = `
      <div class="details-empty">
        <h1>Carro não encontrado</h1>
        <p>Não foi possível localizar os detalhes deste veículo.</p>
        <a href="index.html" class="btn btn-primary">Voltar para a página inicial</a>
      </div>
    `;
    return;
  }

  function priceToNumber(price) {
    return Number(
      String(price)
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    );
  }

  function formatPrice(price) {
    const numberPrice = priceToNumber(price);

    return numberPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  detailsContainer.innerHTML = `
    <div class="car-details-media">
      <img src="${selectedCar.img}" alt="${selectedCar.name}" />
    </div>

    <div class="car-details-content">
      <p class="details-eyebrow">Detalhes do veículo</p>

      <h1>${selectedCar.name}</h1>

      <strong class="details-price">${formatPrice(selectedCar.price)}</strong>

      <p class="details-description">
        ${selectedCar.description || "Veículo cadastrado no marketplace MotorPlace."}
      </p>

      <div class="details-specs">
        <div>
          <span>Marca</span>
          <strong>${selectedCar.brand || "Não informado"}</strong>
        </div>

        <div>
          <span>Modelo</span>
          <strong>${selectedCar.model || "Não informado"}</strong>
        </div>

        <div>
          <span>Categoria</span>
          <strong>${selectedCar.type || "Não informado"}</strong>
        </div>

        <div>
          <span>Ano</span>
          <strong>${selectedCar.year || "Não informado"}</strong>
        </div>

        <div>
          <span>Quilometragem</span>
          <strong>${selectedCar.km || "0"} km</strong>
        </div>

        <div>
          <span>Combustível</span>
          <strong>${selectedCar.fuel || "Não informado"}</strong>
        </div>

        <div>
          <span>Câmbio</span>
          <strong>${selectedCar.transmission || "Não informado"}</strong>
        </div>

        <div>
          <span>Cor</span>
          <strong>${selectedCar.color || "Não informado"}</strong>
        </div>

        <div>
          <span>Localização</span>
          <strong>${selectedCar.location || "Não informado"}</strong>
        </div>
      </div>

      <div class="details-actions">
        <a href="index.html#featured-title" class="btn btn-outline">Voltar para ofertas</a>
        <a href="#" class="btn btn-primary">Tenho interesse</a>
      </div>
    </div>
  `;
});