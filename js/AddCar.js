document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-car-form");

  if (!form) {
    console.error("Formulário add-car-form não encontrado.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("car-name").value.trim();
    const type = document.getElementById("car-type").value.trim();
    const km = document.getElementById("car-km").value.trim();
    const fuel = document.getElementById("car-fuel").value.trim();
    const price = document.getElementById("car-price").value.trim();
    const img = document.getElementById("car-img").value.trim();

    const car = {
      name,
      type,
      km,
      fuel,
      price,
      img
    };

    const cars = JSON.parse(localStorage.getItem("cars")) || [];

    cars.push(car);

    localStorage.setItem("cars", JSON.stringify(cars));

    alert(`Carro adicionado: ${car.name}`);

    form.reset();

    if (window.opener) {
      window.opener.location.reload();
      window.close();
    } else {
      window.location.href = "index.html";
    }
  });
});