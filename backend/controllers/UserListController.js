const express = require('express')
const router = express.Router();
const avModel = require('../models/DictionaryManagement.model');
router.get('/getPage', async (req, res) => {
    const page = req.query.page
    const rowsPerPage = req.query.rowsPerPage
    const textSearch = req.query.textSearch
    const list = await avModel.getAllPaging('user', `IdRole = 2 and (Name like '%${textSearch}%' or Email like '%${textSearch}%')`, null, page, rowsPerPage)
    res.json(list)
})
module.exports = router;