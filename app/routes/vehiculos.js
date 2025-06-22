const express = require('express')
const router = express.Router()
// const checkOrigin = require('../middleware/origin')
// const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getVehicleOptions,getModelsForBrand} = require('../controllers/vehiculos')
//const { validateCreateUser } = require('../validators/users')

// //TODO: Turbo 🐱‍🏍  cache!
// router.get(
//     '/',
//     checkOrigin,
//     cacheInit, //
//     getItems
// )

router.get('/options', getVehicleOptions);

// Ruta para obtener los modelos de una marca específica
router.get('/options/models/:brand', getModelsForBrand);


module.exports = router