const express = require('express')
const router = express.Router()
// const checkOrigin = require('../middleware/origin')
// const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, createItem, getItem, deleteItem, updateItem, getUsersWithCursos } = require('../controllers/users')
//const { validateCreateUser } = require('../validators/users')

// //TODO: Turbo 🐱‍🏍  cache!
// router.get(
//     '/',
//     checkOrigin,
//     cacheInit, //
//     getItems
// )

router.get('/', getItems)

// Nueva ruta Maestro-Detalle (Debe ir antes de /:id)
router.get('/maestro-detalle', getUsersWithCursos)

router.get('/:id', getItem)

//TODO: Donde recibimos data
router.post('/', createItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem)


module.exports = router