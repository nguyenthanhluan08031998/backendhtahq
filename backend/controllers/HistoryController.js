const express = require('express')
const router = express.Router();
const avModel = require('../models/History.model');

router.get('/getPage', async (req, res) => {
    const page = req.query.page
    const rowsPerPage = req.query.rowsPerPage
    const IdUser = req.query.IdUser
    const list = await avModel.getAllPaging(
        'SearchHistory',
        `SearchHistory.IdUser = ${IdUser} and AV.Id = SearchHistory.IdWord`,
        null,
        page,
        rowsPerPage,
        "AV",  // Các bảng phụ cần lấy,
        "SearchHistory.Id as Id, SearchHistory.IdWord as IdWord, AV.Word as Word, SearchHistory.TimeSearch, SearchHistory.location" // Chọn các cột cần lấy
    )
    res.json(list)
})

router.get('/getAllHistory', async (req, res) => {
    const IdUser = req.query.IdUser
    const list = await avModel.getAllHistory(IdUser)
    res.json(list)
})

router.get('/getAllHistoryAndPaging', async (req, res) => {
    const IdUser = req.query.IdUser
    const list = await avModel.getAllHistoryAngPaging(IdUser)

    res.json(list)
})


module.exports = router;