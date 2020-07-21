const express = require('express')
const router = express.Router();
const wordSearchModel = require('../models/WordSearch.model');

router.get('/searchword', async (req, res) => {
    var table = req.query.table
    const list = await wordSearchModel.getWord(table, req.query.word)
    res.json(list.ListGrid[0].Id)
})
router.get('/getWordById', async (req, res) => {
    var table = req.query.table
    var id = req.query.id
    const word = await wordSearchModel.getWordById(table, id)
    res.json(word.Word[0])
})
router.get('/getWordByWord', async (req, res) => {
    let table = req.query.table
    let word = req.query.word
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

function promiseToJson(promise) {
    return JSON.parse(JSON.stringify(promise));
}
router.get('/checkExistWordLike', async (req, res) => {
    const promise = await wordSearchModel.checkExist(req.query.IdWord, req.query.IdUser)
    var result = promiseToJson(promise)
    if (result && result.length > 0) {
        res.json(result[0].Id)
    }
    else {
        res.json(false)
    }
})

router.post('/deleteWordLike', async (req, res) => {
    const word = req.body
    await wordSearchModel.deleteWordLike('WordLike', word.Id)
    res.json(1)
})

router.get('/getOption', async (req, res) => {
    const e = req.query.e
    const languageTable = req.query.languageTable
    result = await wordSearchModel.get("Id, Word", languageTable, e)
    res.json(result)
})
router.post('/updateTopicRemember', async (req, res) => {
    var item = req.body;
    // let data = await wordSearchModel.getIdTopicRemember(item);
    // console.log(data)
    result = await wordSearchModel.add('TopicRemember', item)
    if (result.affectedRows > 0) res.json(true)
    else res.json(false)
})
module.exports = router;