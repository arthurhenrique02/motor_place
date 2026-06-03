document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-car-form");

  if (!form) {
    console.error("Formulário add-car-form não encontrado.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const imageFile = form.querySelector('[name="carImage"]').files[0];

    if (!imageFile) {
      alert("Selecione uma imagem do carro.");
      return;
    }

    const imageBase64 = await readFileAsBase64(imageFile);

    const stored = JSON.parse(localStorage.getItem("motorplace_cars") || '{"vehicles":[]}');
    const DEFAULT_CARS_COUNT = 3;
    const nextId = Math.max(
      DEFAULT_CARS_COUNT,
      stored.vehicles.reduce((max, v) => Math.max(max, Number(v.id) || 0), 0)
    ) + 1;

    const newVehicle = {
      id: nextId,
      title: (data.carName || "Novo carro").trim(),
      brand: (data.carBrand || "").trim(),
      model: (data.carModel || "").trim(),
      category: (data.carType || "").trim(),
      year: Number(data.carYear) || new Date().getFullYear(),
      price: Number(data.carPrice) || 0,
      km: Number(data.carKm) || 0,
      fuel: (data.carFuel || "").trim(),
      transmission: (data.carTransmission || "").trim(),
      color: (data.carColor || "").trim(),
      location: (data.carLocation || "").trim(),
      featured: false,
      description: (data.carDescription || "").trim(),
      thumbnail: imageBase64,
      images: [imageBase64],
      videos: []
    };

    stored.vehicles.push(newVehicle);
    localStorage.setItem("motorplace_cars", JSON.stringify(stored));

    alert(`Carro adicionado: ${newVehicle.title}`);
    form.reset();

    if (window.opener) {
      window.opener.location.reload();
      window.close();
    } else {
      window.location.href = "index.html";
    }
  });

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
