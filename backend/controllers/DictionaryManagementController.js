const express = require('express')
const router = express.Router();
const avModel = require('../models/DictionaryManagement.model');

function promiseToJson(promise) {
    return JSON.parse(JSON.stringify(promise));
}
router.get('/getPage', async (req, res) => {
    const page = req.query.page
    const rowsPerPage = req.query.rowsPerPage
    const textSearch = req.query.textSearch
    const list = await avModel.getAllPaging('AV', `word like N'%${textSearch}%' or Description like N'%${textSearch}%'`, null, page, rowsPerPage)
    res.json(list)
})
router.post('/addOrUpdate', async (req, res) => {
    var id = -1
    var item = req.body
    if (item.Id == 0) {
        result = await avModel.add('AV', item)
        if (result.affectedRows > 0 && result.insertId) id = result.insertId
    }
    else if (item.Id > 0) {
        result = await avModel.update('AV', item, item.Id)
        if (result.affectedRows > 0) id = item.Id
    }
    res.json(id)
})
router.get('/get', async (req, res) => {
    const Id = req.query.Id
    const Word = req.query.Word
    result = await avModel.checkExist(Word, Id)
    var list = JSON.parse(JSON.stringify(result));
    if (list && list.length > 0) {
        res.json({ exist: true })
    } else res.json({ exist: false })
})

router.get('/getOption', async (req, res) => {
    result = await avModel.get("Id, NameTopic")
    console.log(result)
    res.json(result)
})

router.get('/getWordByTopic', async (req, res) => {
    const Id = req.query.IdTopic
    result = await avModel.getWordByTopic(Id)
    res.json(result)
})
module.exports = router;