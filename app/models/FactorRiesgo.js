const mongoose = require('mongoose');

const FactorRiesgoSchema = new mongoose.Schema({
  tipo: { type: String, required: true, enum: ['GEOGRAFICO'] }, // Para futura expansión
  nombre: { type: String, required: true, unique: true }, // Ej: "Comas" o "Miraflores"
  factor: { type: Number, required: true } // Ej: 1.15 o 0.90
});

module.exports = mongoose.model('FactorRiesgo', FactorRiesgoSchema);