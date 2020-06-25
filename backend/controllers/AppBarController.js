const express = require('express')
const router = express.Router();
const appBarModel = require('../models/AppBar.model');

router.get('/getWordByGetSelectionText', async (req, res) => {
    const text = req.query.text
    const list = await appBarModel.getWordByGetSelectionText(text)
    res.json(list[0])
})
module.exports = router;