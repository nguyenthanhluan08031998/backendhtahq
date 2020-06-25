const express = require('express')
const router = express.Router();
const funcMenuModel = require('../models/FuncMenu.model');

router.get('/',async( req, res) => {
    const list = await funcMenuModel.all()
    res.json(list)
})
router.get('getImageFunction',async(req, res) =>{
    const image = await funcMenuModel.getImageFunction()
    res.json(image)
})
module.exports = router;