const mongoose = require('mongoose');

// --- Esquema Detalle: Lección ---
const LeccionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String
    },
    videoUrl: {
        type: String
    },
    duracion: {
        type: Number // duración en minutos
    },
    orden: {
        type: Number,
        required: true
    }
});

// --- Esquema Maestro: Curso ---
const CursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    categoria: {
        type: String,
        enum: ['desarrollo', 'diseño', 'marketing', 'negocios', 'otro'],
        default: 'otro'
    },
    nivel: {
        type: String,
        enum: ['basico', 'intermedio', 'avanzado'],
        default: 'basico'
    },
    precio: {
        type: Number,
        required: true
    },
    publicado: {
        type: Boolean,
        default: false
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    // --- Relación Maestro-Detalle: lecciones embebidas ---
    lecciones: [LeccionSchema]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('cursos', CursoSchema);
