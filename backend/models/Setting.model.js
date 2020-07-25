const db = require('../utils/db');
module.exports = {
    add: (table, item) => db.add(table, item),
    update: (table, item, id) => db.update(table, item, id),
    getAllRemindWord: (Id) => db.load(`select * from RemindSupport, Av where IdRemind = ${Id} and `),
    getById: (IdUser) => db.load(`select * from Remind where IdUser = ${IdUser}`),
    getTopicUserRemind: (IdUser, IdTopic) => db.load(`select * from TopicUserRemind where IdUser = ${IdUser} and IdTopic = ${IdTopic}`),
    getPresentRemindWord: (id) => db.load(`select * from TopicUserRemindDetail where IdTopicUserRemind = ${id}`),
    getRandomHistory: (id) => db.load(`
        SELECT AV.Id, AV.Word , AV.Description, AV.Pronounce
        FROM SearchHistory, AV 
        where IdUser = ${id} and av.Id = SearchHistory.IdWord
        ORDER BY RAND()
        LIMIT 1`),
    getRandomFavorite: (id) => db.load(
        `SELECT AV.Id, AV.Word , AV.Description, AV.Pronounce
        FROM WordLike, AV
        where IdUser = ${id} and AV.Id = WordLike.IdWord
        ORDER BY RAND()
        LIMIT 1`
    ),
    getRandomTopic: (IdUser, IdTopic) => db.load(
        `SELECT AV.Id, AV.Word , AV.Description, AV.Pronounce
        FROM TopicUserRemind, AV, TopicUserRemindDetail 
        where TopicUserRemind.IdUser = ${IdUser} and TopicUserRemind.IdTopic = ${IdTopic} 
        and TopicUserRemindDetail.IdTopicUserRemind = TopicUserRemind.Id and AV.Id = TopicUserRemindDetail.IdWord
        ORDER BY RAND()
        LIMIT 1`
    )
}