const quoteModel = require('../models/quotes');

const createQuote = async (quoteData) => {
    try {
        const newQuote = new quoteModel(quoteData);
        return await newQuote.save();
    } catch (error) {
        throw new Error('Error creating quote: ' + error.message);
    }
};

const getAllQuotes = async () => {
    try {
        return await quoteModel.find({});
    } catch (error) {
        throw new Error('Error retrieving quotes: ' + error.message);
    }
};

const getQuoteById = async (id) => {
    try {
        return await quoteModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving quote by ID: ' + error.message);
    }
};

module.exports = {
    createQuote,
    getAllQuotes,
    getQuoteById

};