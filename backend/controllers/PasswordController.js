const express = require('express')
const router = express.Router();
const model = require('../models/Password.model');
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
    const email = req.query.email
    const password = req.query.password
    const users = await model.get(email)
    if (users.length == 0) {
        return res.json({ "authenticated": false })
    }
    const user = users[0]
    if (!user) {
        res.json({ "authenticated": false })
        return
    }
    if (email == user.Email && bcrypt.compareSync(password, user.Password)) {
        delete user.Password
        res.json(user)
    }
    else res.json({ "authenticated": "not match" })
})

router.get('/checkUser', async (req, res) => {
    const email = req.query.email
    const users = await model.checkExist(email)
    if (users.length == 0) {
        return res.json({ "exist": false })
    }
    else res.json({ "exist": true })
})

router.post('/addOrUpdate', async (req, res) => {
    var id = -1
    let user = req.body

    const email = user.Email
    const users = await model.checkExist(email)
    if (users && users.length > 0 && user.Id == 0) {
        return res.json({ "exist": true })
    }

    let hash = bcrypt.hashSync(user.Password, 10);
    user.Password = hash
    if (user.Id == 0) {
        result = await model.add('User', user)
        if (result.affectedRows > 0 && result.insertId) id = result.insertId
    }
    else if (user.Id > 0) {
        result = await model.update('User', user, user.Id)
        if (result.affectedRows > 0) id = user.Id
    }
    res.json({ IdUser: id })
})
module.exports = router;