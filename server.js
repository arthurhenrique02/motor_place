const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, "data.json");
const UPLOADS_DIR = path.join(ROOT_DIR, "uploads");

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

function readDatabase() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.vehicles)) {
      return { vehicles: [] };
    }

    return parsed;
  } catch {
    return { vehicles: [] };
  }
}

function writeDatabase(database) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2));
}

function nextVehicleId(vehicles) {
  return vehicles.reduce((maxId, vehicle) => Math.max(maxId, Number(vehicle.id) || 0), 0) + 1;
}

function parseNumber(value) {
  return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
}

function normalizeText(value, fallback = "") {
  const text = String(value || fallback).trim();
  return text;
}

function firstValue(source, keys, fallback = "") {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null && String(source[key]).trim() !== "") {
      return source[key];
    }
  }

  return fallback;
}

function buildVehicle(body, file) {
  const thumbnail = file ? `/uploads/${file.filename}` : normalizeText(body.thumbnail || body.img, "");

  return {
    id: 0,
    title: normalizeText(firstValue(body, ["title", "name", "carName"]), "Novo carro"),
    brand: normalizeText(firstValue(body, ["brand", "carBrand"])),
    model: normalizeText(firstValue(body, ["model", "carModel"])),
    category: normalizeText(firstValue(body, ["category", "type", "carType"])),
    year: Number(firstValue(body, ["year", "carYear"])) || new Date().getFullYear(),
    price: parseNumber(firstValue(body, ["price", "carPrice"])),
    km: parseNumber(firstValue(body, ["km", "carKm"])),
    fuel: normalizeText(firstValue(body, ["fuel", "carFuel"])),
    transmission: normalizeText(firstValue(body, ["transmission", "carTransmission"])),
    color: normalizeText(firstValue(body, ["color", "carColor"])),
    location: normalizeText(firstValue(body, ["location", "carLocation"])),
    featured: String(firstValue(body, ["featured"], "false")).toLowerCase() === "true",
    description: normalizeText(firstValue(body, ["description", "carDescription"])),
    thumbnail,
    images: thumbnail ? [thumbnail] : [],
    videos: []
  };
}

function normalizeForDisplay(vehicle) {
  return {
    id: vehicle.id,
    name: vehicle.title || vehicle.name || "Sem nome",
    brand: vehicle.brand || "Não informado",
    model: vehicle.model || "Não informado",
    type: vehicle.category || vehicle.type || "Não informado",
    year: vehicle.year || "Não informado",
    km: vehicle.km || 0,
    fuel: vehicle.fuel || "Não informado",
    transmission: vehicle.transmission || "Não informado",
    color: vehicle.color || "Não informado",
    location: vehicle.location || "Não informado",
    price: vehicle.price || 0,
    description: vehicle.description || "Veículo cadastrado no marketplace MotorPlace.",
    img: vehicle.thumbnail || vehicle.img || "../uploads/carro1.jpg"
  };
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, UPLOADS_DIR),
  filename: (request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, extension)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    callback(null, `${Date.now()}-${baseName || "carro"}${extension}`);
  }
});

const upload = multer({ storage });

app.use(express.static(ROOT_DIR));

function sendHtmlFile(response, fileName) {
  response.sendFile(path.join(ROOT_DIR, "Html", fileName));
}

app.get("/", (request, response) => {
  sendHtmlFile(response, "index.html");
});

app.get("/index.html", (request, response) => {
  sendHtmlFile(response, "index.html");
});

app.get("/add-car.html", (request, response) => {
  sendHtmlFile(response, "add-car.html");
});

app.get("/car-details.html", (request, response) => {
  sendHtmlFile(response, "car-details.html");
});

app.get("/api/cars", (request, response) => {
  const database = readDatabase();
  response.json(database);
});

app.get("/api/cars/:id", (request, response) => {
  const database = readDatabase();
  const id = Number(request.params.id);
  const vehicle = database.vehicles.find((item) => Number(item.id) === id);

  if (!vehicle) {
    response.status(404).json({ error: "Carro não encontrado" });
    return;
  }

  response.json(normalizeForDisplay(vehicle));
});

app.post("/api/cars", upload.single("carImage"), (request, response) => {
  try {
    const database = readDatabase();
    const newVehicle = buildVehicle(request.body || {}, request.file || null);

    if (!newVehicle.thumbnail) {
      response.status(400).json({ error: "Envie uma imagem do carro" });
      return;
    }

    newVehicle.id = nextVehicleId(database.vehicles);
    database.vehicles.push(newVehicle);
    writeDatabase(database);

    response.status(201).json(normalizeForDisplay(newVehicle));
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Não foi possível salvar o carro" });
  }
});

app.listen(PORT, () => {
  console.log(`MotorPlace rodando em http://localhost:${PORT}`);
});