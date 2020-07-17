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


router.post('/changepassword', async (req, res) => {
    let user = req.body

    const email = user.Email
    const users = await model.checkExistAccount(email);
    const user1 = users[0]
    if (user && bcrypt.compareSync(user.OldPassword, user1.Password)) {
        if (user.Password == user.PasswordConfirm) {
            let hash = bcrypt.hashSync(user.Password);
            user.Password = hash
            // console.log(user.Password)
            var item = users[0];
            item.Password = user.Password
            item.IdRole = 2
            model.update("user", item, item.Id)
            res.json(1)
            return
        }
        else {
            res.json(-1)
            return
        }
    }
    else {
        res.json(-2)
        return
    }

})
router.post('/forgotpassword', async (req, res) => {
    let user = req.body
    const email = user.Email
    const users = await model.checkExist(email);

    if (user.Password == user.PasswordConfirm) {
        let hash = bcrypt.hashSync(user.Password);
        user.Password = hash
        var item = users[0];
        item.Password = user.Password
        model.update("user", item, item.Id)
        res.json(1)
    }
    else {
        res.json(-1)
    }
})
module.exports = router;