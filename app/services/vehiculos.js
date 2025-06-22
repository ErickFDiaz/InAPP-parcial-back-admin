const Vehiculo = require('../models/Vehiculo');

/**
 * Obtiene las listas de marcas y años únicos para los desplegables.
 */
const getVehicleOptions = async () => {
    // Esta lógica pertenece aquí porque solo consulta información de vehículos.
    const brands = await Vehiculo.distinct('marca');
    const years = await Vehiculo.distinct('año');
    return {
        brands: brands.sort(),
        years: years.sort((a, b) => b - a)
    };
};

/**
 * Obtiene los modelos únicos para una marca específica.
 */
const getModelsForBrand = async (brandName) => {
    const models = await Vehiculo.find({ marca: brandName }).distinct('modelo');
    return models.sort();
};

module.exports = {
    getVehicleOptions,
    getModelsForBrand
};