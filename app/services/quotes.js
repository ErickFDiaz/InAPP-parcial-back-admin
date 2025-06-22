const Quote = require('../models/quotes');
const Vehiculo = require('../models/Vehiculo');
const FactorRiesgo = require('../models/FactorRiesgo');

// --- Funciones de Cálculo Auxiliares ---
const getFactorConductor = (fechaNac) => {
    if (!fechaNac) return 1.0; // Factor neutro si no hay fecha
    const edad = new Date().getFullYear() - new Date(fechaNac).getFullYear();
    if (edad < 25) return 1.3;
    if (edad > 60) return 1.1;
    return 1.0;
};

const getFactorCoberturas = (coberturas) => {
    let factor = 1.0;
    if (coberturas?.asistenciaElectricos) factor += 0.05;
    if (coberturas?.coberturaBateria) factor += 0.20;
    if (coberturas?.danoEstacionCarga) factor += 0.05;
    if (coberturas?.riesgoCibernetico) factor += 0.03;
    return factor;
};

const getFactorDeducible = (d) => {
    if (d <= 250) return 1.1;
    if (d >= 1000) return 0.85;
    return 1.0;
};

/**
 * ETAPA 1: Crea un lead desde la landing page.
 */
const createLeadQuote = async (leadData) => {

    // Desestructuramos solo lo que necesitamos para la búsqueda del vehículo
    const { brand, model, year, version = 'default' } = leadData;

    const vehiculoEncontrado = await Vehiculo.findOne({ marca: brand, modelo: model, año: year, version: version });
    if (!vehiculoEncontrado) {
        throw new Error(`Vehículo no encontrado: ${brand} ${model} ${year}.`);
    }
    const sumaAsegurada = vehiculoEncontrado.valorComercialUSD;
    const TASA_BASE = 0.05;
    const montoPrimaPreliminar = (sumaAsegurada * TASA_BASE) * 1.0 * 1.0 * 1.0 * 1.0;

    // --- LA CORRECCIÓN ESTÁ AQUÍ ---
    // Usamos el spread operator (...) para pasar TODOS los campos de leadData
    // y luego añadimos o sobreescribimos los campos calculados.
    const newLead = new Quote({
        ...leadData, // Esto incluye document, phone, usage, plate, etc.
        sumaAsegurada: sumaAsegurada.toFixed(2),
        montoPrima: montoPrimaPreliminar.toFixed(2),
        status: 'lead'
    });

    await newLead.save();
    return newLead;
};


/**
 * ETAPA 2: Actualiza y recalcula una cotización con datos completos.
 */
const updateAndRecalculateQuote = async (id, quoteData) => {
    const quote = await Quote.findById(id);
    if (!quote) throw new Error('Cotización no encontrada.');

    const { fechaNacimiento, distrito, coberturasAdicionales, deducible, status, ...restOfData } = quoteData;

    // La lógica para recalcular la prima no cambia...
    const factorGeoData = await FactorRiesgo.findOne({ tipo: 'GEOGRAFICO', nombre: distrito });
    const factorGeografico = factorGeoData ? factorGeoData.factor : 1.0;
    const TASA_BASE = 0.05;
    const montoPrimaFinal = (quote.sumaAsegurada * TASA_BASE) * getFactorConductor(fechaNacimiento) * factorGeografico * getFactorCoberturas(coberturasAdicionales) * getFactorDeducible(deducible);

    quote.set({
        ...restOfData,
        fechaNacimiento,
        distrito,
        coberturasAdicionales,
        deducible,
        montoPrima: montoPrimaFinal.toFixed(2),
        status: status 
    });
    
    await quote.save();
    return quote;
};


/**
 * ETAPA 3: Actualiza solo el estado (cierre de venta).
 */
const updateQuoteStatus = async (id, status, userId) => {
    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) throw new Error('Estado no válido.');
    
    const updatedQuote = await Quote.findByIdAndUpdate(id, { status, updatedBy: userId }, { new: true });
    if (!updatedQuote) throw new Error('Cotización no encontrada para actualizar estado.');
    
    return updatedQuote;
};

const getAllQuotes = () => Quote.find().sort({ createdAt: -1 }).populate('createdBy', 'name email');
const getQuoteById = (id) => Quote.findById(id).populate('createdBy', 'name email');

module.exports = {
    createLeadQuote,
    updateAndRecalculateQuote,
    updateQuoteStatus,
    getAllQuotes,
    getQuoteById
};