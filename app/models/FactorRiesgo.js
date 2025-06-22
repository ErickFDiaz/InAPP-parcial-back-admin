const mongoose = require('mongoose');

const FactorRiesgoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['GEOGRAFICO']
  },
  nombre: { // Ej: "Comas"
    type: String,
    required: true,
    unique: true
  },
  factor: { // Ej: 1.15
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('FactorRiesgo', FactorRiesgoSchema);