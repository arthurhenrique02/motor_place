document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-car-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const car = {
      name: document.getElementById("car-name").value,
      type: document.getElementById("car-type").value,
      km: document.getElementById("car-km").value,
      fuel: document.getElementById("car-fuel").value,
      price: document.getElementById("car-price").value,
      img: document.getElementById("car-img").value
    };

    // Salva no localStorage
    let cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push(car);
    localStorage.setItem("cars", JSON.stringify(cars));

    alert(`Carro adicionado: ${car.name}`);
    form.reset();

    // Redireciona para a página principal
    window.location.href = "../index.html";
  });
});