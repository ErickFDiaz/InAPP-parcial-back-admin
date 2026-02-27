const express = require('express')
const router = express.Router()

const {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
    addLeccion,
    updateLeccion,
    deleteLeccion
} = require('../controllers/cursos')

// --- Rutas Maestro: Cursos ---
router.get('/', getAllCursos)
router.get('/:id', getCursoById)
router.post('/', createCurso)
router.put('/:id', updateCurso)
router.delete('/:id', deleteCurso)

// --- Rutas Detalle: Lecciones ---
router.post('/:id/lecciones', addLeccion)
router.put('/:id/lecciones/:leccionId', updateLeccion)
router.delete('/:id/lecciones/:leccionId', deleteLeccion)

module.exports = router
