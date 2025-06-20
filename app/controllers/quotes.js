const quoteService = require('../services/quotes');
const responseHandler = require('../helpers/handleResponse');

/**
 * Create a new quote
 */
const createQuote = async (req, res) => {
    try {

        const { brand, document, hasPlate, model, phone, plate, usage, year } = req.body;
        const newQuote = await quoteService.createQuote({ brand, document, hasPlate, model, phone, plate, usage, year });
        const response = responseHandler.success('Quote created successfully', newQuote);
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
    getAllQuotes,
    getQuoteById
};
