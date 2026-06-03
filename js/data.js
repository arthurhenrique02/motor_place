// BASE DE DADOS DOS CARROS FIXOS
// Esses três carros são exibidos sempre, independente do que está salvo no navegador.
const defaultCars = [
  {
    id: 1,
    name: "Honda Civic Touring 2022",
    type: "Sedan",
    km: "32.000",
    fuel: "Flex",
    price: "149.900",
    img: "../uploads/carro1.jpg"
  },
  {
    id: 2,
    name: "Jeep Compass Limited 2021",
    type: "SUV",
    km: "41.500",
    fuel: "Diesel",
    price: "169.900",
    img: "../uploads/carro2.jpeg"
  },
  {
    id: 3,
    name: "Volkswagen Polo Highline 2023",
    type: "Hatch",
    km: "12.400",
    fuel: "Flex",
    price: "108.500",
    img: "../uploads/carro3.jpg"
  }
];

// FUNÇÕES AUXILIARES
// Funções pequenas de formatação e normalização usadas pelos outros arquivos.

/**
 * Converte um preço em texto para número.
 * Exemplo: "R$ 149.900" ou "149.900" vira 149900.
 */
function priceToNumber(price) {
  return Number(
    String(price)
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
}

/**
 * Formata um número ou texto de preço para o padrão brasileiro.
 * Exemplo: 149900 vira "R$ 149.900,00".
 */
function formatPrice(price) {
  return priceToNumber(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/**
 * Formata a quilometragem para o padrão brasileiro.
 * Exemplo: 32000 vira "32.000".
 */
function formatKm(km) {
  const n = Number(String(km).replace(/\./g, "").replace(",", ".").trim());
  return Number.isFinite(n) ? n.toLocaleString("pt-BR") : String(km);
}

/**
 * Padroniza textos para facilitar a busca e comparação.
 * Transforma em minúsculo e remove acentos.
 * Exemplo: "Elétrico" vira "eletrico".
 */
function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/**
 * Converte um objeto de carro (vindo do localStorage ou dos dados fixos)
 * para o formato padrão usado pela interface.
 * Garante que campos ausentes recebam valores padrão.
 */
function normalizeCar(car) {
  return {
    id: car.id,
    name: car.title || car.name || "Sem nome",
    type: car.category || car.type || "Sem categoria",
    km: formatKm(car.km || 0),
    fuel: car.fuel || "Não informado",
    price: car.price || 0,
    img: car.thumbnail || car.img || ""
  };
}

// LEITURA DOS CARROS
// Combina os carros fixos com os carros salvos pelo usuário no navegador.

/**
 * Retorna a lista completa de carros: os fixos seguidos dos salvos pelo usuário.
 * Em caso de erro na leitura do localStorage, retorna apenas os carros fixos.
 */
function loadCars() {
  try {
    const data = JSON.parse(localStorage.getItem("motorplace_cars") || '{"vehicles":[]}');
    const saved = Array.isArray(data.vehicles) ? data.vehicles.map(normalizeCar) : [];
    return [...defaultCars, ...saved];
  } catch {
    return defaultCars;
  }
}
