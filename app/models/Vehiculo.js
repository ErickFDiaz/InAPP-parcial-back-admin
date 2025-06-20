const mongoose = require('mongoose');

const VehiculoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  version: { type: String, required: true },
  año: { type: Number, required: true },
  valorComercialUSD: { type: Number, required: true }
});

// Creamos un índice compuesto para búsquedas rápidas
VehiculoSchema.index({ marca: 1, modelo: 1, version: 1, año: 1 });

module.exports = mongoose.model('Vehiculo', VehiculoSchema);