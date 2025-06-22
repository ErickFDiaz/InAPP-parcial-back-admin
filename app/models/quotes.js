const mongoose = require('mongoose');

const QuoteScheme = new mongoose.Schema({
    // --- Datos de la Pantalla 1 (Formulario Principal) ---
    document: { type: String, required: true },
    phone: { type: String, required: true },
    plate: { type: String },
    hasPlate: { type: Boolean, default: false },
    
    // --- Datos de la Pantalla 2 (Detalles del Vehículo) ---
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    usage: { type: String, required: true },

    // --- Datos que no vienen de la landing (se completan después) ---
    nombre: { type: String },
    email: { type: String },
    distrito: { type: String },
    fechaNacimiento: { type: Date },
    
    // --- Resultados del Cálculo ---
    sumaAsegurada: { type: Number, required: true },
    montoPrima: { type: Number, required: true },
    deducible: { type: Number, default: 500 },

    // --- Coberturas (a completar por el asesor) ---
    coberturasAdicionales: { /* ... (objeto con booleans) ... */ },
    
    // --- Flujo de Estado ---
    status: {
        type: String,
        enum: ['lead', 'pending', 'approved', 'rejected'],
        default: 'lead'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('quotes', QuoteScheme);