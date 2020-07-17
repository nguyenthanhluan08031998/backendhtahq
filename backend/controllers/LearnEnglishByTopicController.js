const express = require('express')
const router = express.Router();
const learnEnglishByTopicModel = require('../models/LearnEnglishByTopic.model');

router.get('/getPage', async (req, res) => {
    const page = req.query.page
    const rowsPerPage = req.query.rowsPerPage
    console.log(page, rowsPerPage)
    const list = await learnEnglishByTopicModel.getAllPaging('Topic', null, null, page, rowsPerPage)
    res.json(list)
}),
    router.get('/getListVocabularyByTopic', async (req, res) => {
        let idTopic = req.query.idTopic
        let data = await learnEnglishByTopicModel.getVocabularyByTopic(idTopic);
        res.json(data)
    })
module.exports = router;