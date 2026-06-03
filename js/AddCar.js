document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-car-form");

  if (!form) {
    console.error("Formulário add-car-form não encontrado.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar o carro");
      }

      const savedCar = await response.json();

      alert(`Carro adicionado: ${savedCar.name}`);

      form.reset();

      if (window.opener) {
        window.opener.location.reload();
        window.close();
      } else {
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar o carro.");
    }
  });
});