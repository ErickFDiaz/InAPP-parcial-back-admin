const express = require('express')
const router = express.Router()

//const checkRoleAuth = require('../middleware/roleAuth')
const { createQuote,getAllQuotes,getQuoteById } = require('../controllers/quotes')

router.post('/', createQuote)
router.get('/',getAllQuotes)
router.get('/:id', getQuoteById)




module.exports = router