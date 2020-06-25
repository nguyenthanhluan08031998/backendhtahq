const express = require('express')
const router = express.Router();
const wordSearchModel = require('../models/WordSearch.model');

router.get('/searchword', async (req, res) => {
    var table = req.query.table
    const list = await wordSearchModel.getWord(table,req.query.word)
    res.json(list.ListGrid[0].Id)
})
router.get('/getWordById', async (req, res) => {
    var table = req.query.table
    var id = req.query.id
    const word = await wordSearchModel.getWordById(table,id)
    res.json(word.Word[0])
})
router.get('/getWordByWord', async(req, res) => {
    let table = req.query.table
    let word = req. query.word
    let result = await wordSearchModel.getWordByWord(table, word)
    res.json(result.Word[0])
})
router.post('/addOrUpdateWordLike', async (req, res) => {
    var id = -1
    var item = req.body
    if (item.Id == 0) {
        result = await wordSearchModel.add('WordLike', item)
        if (result.affectedRows > 0 && result.insertId) id = result.insertId
    }
    else if (item.Id > 0) {
        result = await await wordSearchModel.update('WordLike', item, item.Id)
        if (result.affectedRows > 0) id = item.Id
    }
    res.json(id)
})

router.post('/addOrUpdate', async (req, res) => {
    var id = -1
    var item = req.body
    if (item.Id == 0) {
        result = await wordSearchModel.add('SearchHistory', item)
        if (result.affectedRows > 0 && result.insertId) id = result.insertId
    }
    else if (item.Id > 0) {
        result = await wordSearchModel.update('SearchHistory', item, item.Id)
        if (result.affectedRows > 0) id = item.Id
    }
    res.json(id)
})

router.get('/checkExistWordLike', async (req, res) => {
    const result = await wordSearchModel.checkExist(req.query.IdWord)
    res.json(result.ListGrid[0])
})

router.post('/deleteWordLike', async (req, res) => {
    const word = req.body
    await wordSearchModel.deleteWordLike('WordLike', word.Id)
})

router.get('/getOption', async (req, res) => {
    const e = req.query.e
    const languageTable = req.query.languageTable
    result = await wordSearchModel.get("Id, Word", languageTable, e)
    res.json(result)
})

module.exports = router;