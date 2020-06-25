const express = require('express')
const router = express.Router();
const topicModel = require('../models/TopicManagement.model');
router.get('/getPage', async (req, res) => {
    const page = req.query.page
    const rowsPerPage = req.query.rowsPerPage
    const list = await topicModel.getAllPaging('Topic', null, null, page, rowsPerPage)
    res.json(list)
})
router.post('/addOrUpdate', async (req, res) => {
    var id = -1
    var item = req.body
    if (item.Id == 0) {
        result = await topicModel.add('Topic', item)
        if (result.affectedRows > 0 && result.insertId) id = result.insertId
    }
    else if (item.Id > 0) {
        result = await topicModel.update('Topic', item, item.Id)
        if (result.affectedRows > 0) id = item.Id
    }
    res.json(id)
})
router.get('/get', async (req, res) => {
    const Id = req.query.Id
    const NameTopic = req.query.NameTopic
    result = await topicModel.checkExist(NameTopic, Id)
    var list = JSON.parse(JSON.stringify(result));
    if (list && list.length > 0) {
        res.json({ exist: true })
    } else res.json({ exist: false })
})

router.get('/getAll', async (req, res) => {
    result = await topicModel.all()
    res.json(result)
})

router.get('/getAllTopicWithNumberWord', async (req, res) => {
    result = await topicModel.getAllTopicWithNumberWord()
    res.json(result)
})
module.exports = router;