const express = require('express')
const router = express.Router();
const avModel = require('../models/Remember.model');

router.get('/getPage', async (req, res) => {
    const page = req.query.page
    const rowsPerPage = req.query.rowsPerPage
    const IdUser = req.query.IdUser
    const list = await avModel.getAllPaging(
        'TopicRemember',
        `TopicRemember.IdUser = ${IdUser} and AV.Id = TopicRemember.IdWord`,
        null,
        page,
        rowsPerPage,
        "AV",  // Các bảng phụ cần lấy,
        "TopicRemember.Id as Id, TopicRemember.IdWord as IdWord, AV.Word as Word" // Chọn các cột cần lấy
    )
    res.json(list)
})

router.get('/getAllFavorite', async (req, res) => {
    const IdUser = req.query.IdUser
    const list = await avModel.getAllFavorite(IdUser)
    res.json(list)
})

module.exports = router;