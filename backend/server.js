// Backend: API REST con Express. Guarda los datos en un archivo JSON.
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB = path.join(__dirname, 'data', 'vehiculos.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// --- Funciones de persistencia ---
function leer() {
  try { return JSON.parse(fs.readFileSync(DB, 'utf8')); }
  catch { return []; }
}
function guardar(vehiculos) {
  fs.mkdirSync(path.dirname(DB), { recursive: true });
  fs.writeFileSync(DB, JSON.stringify(vehiculos, null, 2));
}

// --- Rutas ---
// Listar vehículos
app.get('/api/vehiculos', (req, res) => {
  res.json(leer());
});

// Registrar vehículo
app.post('/api/vehiculos', (req, res) => {
  const nombre = String(req.body.nombre || '').trim();
  const marca = String(req.body.marca || '').trim();
  const kilometraje = Number(req.body.kilometraje);

  if (!nombre || !marca) {
    return res.status(400).json({ error: 'El nombre y la marca son obligatorios.' });
  }
  if (!Number.isFinite(kilometraje) || kilometraje < 0) {
    return res.status(400).json({ error: 'El kilometraje debe ser un número mayor o igual a 0.' });
  }

  const vehiculos = leer();
  const nuevo = { id: Date.now(), nombre, marca, kilometraje };
  vehiculos.push(nuevo);
  guardar(vehiculos);
  res.status(201).json(nuevo);
});

// Eliminar vehículo
app.delete('/api/vehiculos/:id', (req, res) => {
  const id = Number(req.params.id);
  const vehiculos = leer();
  const restantes = vehiculos.filter(v => v.id !== id);
  if (restantes.length === vehiculos.length) {
    return res.status(404).json({ error: 'Vehículo no encontrado.' });
  }
  guardar(restantes);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Servidor listo en http://localhost:${PORT}`));
