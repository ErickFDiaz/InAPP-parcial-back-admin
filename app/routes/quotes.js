const express = require('express')
const router = express.Router()

//const checkRoleAuth = require('../middleware/roleAuth')
const { createQuote,getAllQuotes,getQuoteById,updateStatus,updateQuote } = require('../controllers/quotes')

router.post('/', createQuote)
router.get('/',getAllQuotes)
router.get('/:id', getQuoteById)
router.put('/:id', updateQuote)
router.patch('/:id/status', updateStatus)




module.exports = router