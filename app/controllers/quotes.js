const quoteService = require('../services/quotes');
const responseHandler = require('../helpers/handleResponse');

/**
 * ETAPA 1: Crea un lead desde la landing page.
 * Llamado por POST /quotes
 */
const createQuote = async (req, res) => {
    try {
        const newLead = await quoteService.createLeadQuote(req.body);
        const response = responseHandler.success('Lead quote created successfully', newLead);
        responseHandler.send(res, response, 201);
    } catch (e) {
        if (e.message.includes('Vehículo no encontrado')) {
            const response = responseHandler.notFound(e.message);
            return responseHandler.send(res, response);
        }
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * ETAPA 2: Actualiza y recalcula una cotización.
 * Llamado por PUT /quotes/:id
 */
const updateQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedQuote = await quoteService.updateAndRecalculateQuote(id, req.body);
        const response = responseHandler.success('Quote updated and recalculated successfully', updatedQuote);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * ETAPA 3: Actualiza solo el estado (aprueba/rechaza).
 * Llamado por PATCH /quotes/:id/status
 */
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const quote = await quoteService.updateQuoteStatus(id, status, req.user?.id);
        const response = responseHandler.success('Quote status updated successfully', quote);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};


const getAllQuotes = async (req, res) => {
    try {
        const quotes = await quoteService.getAllQuotes();
        const response = responseHandler.success('Quotes retrieved successfully', quotes);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const getQuoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await quoteService.getQuoteById(id);
        if (!quote) {
            const response = responseHandler.notFound('Quote not found');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Quote retrieved successfully', quote);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

module.exports = {
    createQuote,
    updateQuote,
    updateStatus,
    getAllQuotes,
    getQuoteById
};