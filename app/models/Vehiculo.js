const mongoose = require('mongoose');

const VehiculoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  version: { type: String, default: 'default' },
  año: { type: Number, required: true },
  valorComercialUSD: { type: Number, required: true }
});

VehiculoSchema.index({ marca: 1, modelo: 1, año: 1, version: 1 });

module.exports = mongoose.model('Vehiculo', VehiculoSchema);