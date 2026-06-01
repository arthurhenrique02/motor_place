document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-car-form");

  if (!form) {
    console.error("Formulário add-car-form não encontrado.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const car = {
      name: document.getElementById("car-name").value.trim(),
      brand: document.getElementById("car-brand").value.trim(),
      model: document.getElementById("car-model").value.trim(),
      type: document.getElementById("car-type").value.trim(),
      year: document.getElementById("car-year").value.trim(),
      km: document.getElementById("car-km").value.trim(),
      fuel: document.getElementById("car-fuel").value.trim(),
      transmission: document.getElementById("car-transmission").value.trim(),
      color: document.getElementById("car-color").value.trim(),
      location: document.getElementById("car-location").value.trim(),
      price: document.getElementById("car-price").value.trim(),
      description: document.getElementById("car-description").value.trim(),
      img: document.getElementById("car-img").value.trim()
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