// --- CAMBIO EN ESTA LÍNEA ---
const vehicleService = require('../services/vehiculos'); // Apuntamos al nuevo servicio
const responseHandler = require('../helpers/handleResponse');

/**
 * Obtiene las listas de marcas y años únicos.
 */
const getVehicleOptions = async (req, res) => {
    try {
        const options = await vehicleService.getVehicleOptions(); // Llama a la función desde el nuevo servicio
        const response = responseHandler.success('Vehicle options retrieved successfully', options);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Obtiene los modelos únicos para una marca específica.
 */
const getModelsForBrand = async (req, res) => {
    try {
        const { brand } = req.params;
        const models = await vehicleService.getModelsForBrand(brand); // Llama a la función desde el nuevo servicio
        const response = responseHandler.success('Models for brand retrieved successfully', models);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

module.exports = {
    getVehicleOptions,
    getModelsForBrand
};