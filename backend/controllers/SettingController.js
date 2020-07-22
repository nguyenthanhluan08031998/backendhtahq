const express = require('express')
const router = express.Router();
const model = require('../models/Setting.model');
const DictionaryModel = require('../models/DictionaryManagement.model');
const HistoryModel = require('../models/History.model');
const FavoriteModel = require('../models/Favorite.model');


function promiseToString(promise) {
    return JSON.parse(JSON.stringify(promise));
}
router.post('/addOrUpdate', async (req, res) => {
    var id = -1
    var item = req.body
    var promise;
    var result;

    //Loại nhắc nhở chủ đề
    if (item.CategoryReminder == 2) {
        //Lấy chủ đề nhắc nhở đã lưu
        var topicUserRemindItems = await model.getTopicUserRemind(item.IdUser, item.IdTopic)
        var topicUserRemindItem = {}

        //Lấy từ thuộc chủ đề nhắc nhở
        var WordByTopicList = await DictionaryModel.getWordByTopic(item.IdTopic)
        var WordByTopicUserRemindDetail = []

        //Nếu chủ đề nhắc nhở đã tồn tại
        if (topicUserRemindItem.length == 1) {
            topicUserRemindItem = topicUserRemindItems[0]
            promise = await model.getPresentRemindWord(topicUserRemindItem.Id)
            WordByTopicUserRemindDetail = promiseToString(promise)
            var listOldWord = WordByTopicUserRemindDetail.map(x => x.IdWord)
            WordByTopicList = WordByTopicList.filter(x => !listOldWord.includes(x.Id))
            var newWordByTopicUserRemindDetail = WordByTopicList.map(x => ({
                Id: 0,
                IdTopicUserRemind: topicUserRemindItem.Id,
                IdWord: x.Id,
                Remembered: 0
            }))
            newWordByTopicUserRemindDetail.forEach(async (x) => {
                await model.add('TopicUserRemindDetail', x)
            })

        }
        //Chủ đề nhắc nhở mới
        else if (topicUserRemindItems.length == 0) {
            topicUserRemindItem = { Id: 0, IdUser: item.IdUser, IdTopic: item.IdTopic }

            //Lưu chủ đề nhắc nhở mới
            result = await model.add('TopicUserRemind', topicUserRemindItem)
            if (result.affectedRows > 0 && result.insertId) topicUserRemindItem.Id = result.insertId

            WordByTopicUserRemindDetail = promiseToString(WordByTopicList).map(x => ({
                Id: 0,
                IdTopicUserRemind: topicUserRemindItem.Id,
                IdWord: x.Id,
                Remembered: 0
            }))
            WordByTopicUserRemindDetail.forEach(async (x) => {
                await model.add('TopicUserRemindDetail', x)
            });
        }

    }
    if (item.Id == 0) {
        result = await model.add('Remind', item)
        if (result.affectedRows > 0 && result.insertId) id = result.insertId
    }
    else if (item.Id > 0) {
        result = await model.update('Remind', item, item.Id)
        if (result.affectedRows > 0) id = item.Id
    }
    res.json(id)
})

router.get('/getById', async (req, res) => {
    var IdUser = req.query.IdUser
    var promise = await model.getById(IdUser)
    var items = promiseToString(promise)
    if (items && items.length > 0) {
        var item = items[0];
        res.json(item)
        return
    }
    res.json(null)
})


router.get('/getRandomHistory', async (req, res) => {
    var IdUser = req.query.IdUser
    var promise = await model.getRandomHistory(IdUser)
    var items = promiseToString(promise)
    if (items && items.length > 0) {
        var item = items[0];
        res.json(item)
        return
    }
    res.json(-1)
})

router.get('/getRandomFavorite', async (req, res) => {
    var IdUser = req.query.IdUser
    var promise = await model.getRandomFavorite(IdUser)
    var items = promiseToString(promise)
    if (items && items.length > 0) {
        var item = items[0];
        res.json(item)
        return
    }
    res.json(-1)
})

router.get('/getRandomTopic', async (req, res) => {
    var IdUser = req.query.IdUser
    var IdTopic = req.query.IdTopic
    var promise = await model.getRandomTopic(IdUser, IdTopic)
    var items = promiseToString(promise)
    if (items && items.length > 0) {
        var item = items[0];
        res.json(item)
        return
    }
    res.json(-1)
})


module.exports = router;