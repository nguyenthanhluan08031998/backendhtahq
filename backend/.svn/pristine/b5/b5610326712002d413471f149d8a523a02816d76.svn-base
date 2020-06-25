const db = require('../utils/db');
module.exports = {
    add: (table, item) => db.add(table, item),
    update: (table, item, id) => db.update(table, item, id),
    getAllRemindWord: (Id) => db.load(`select * from RemindSupport, Av where IdRemind = ${Id} and `),
    getById: (IdUser) => db.load(`select * from Remind where IdUser = ${IdUser}`),
    getTopicUserRemind: (IdUser, IdTopic) => db.load(`select * from TopicUserRemind where IdUser = ${IdUser} and IdTopic = ${IdTopic}`),
    getPresentRemindWord: (id) => db.load(`select * from topicuserreminddetail where IdTopicUserRemind = ${id}`),
    getRandomHistory: (id) => db.load(`
        SELECT av.Id, av.Word , av.Description, av.Pronounce
        FROM SearchHistory, av 
        where IdUser = ${id} and av.Id = SearchHistory.IdWord
        ORDER BY RAND()
        LIMIT 1`),
    getRandomFavorite: (id) => db.load(
        `SELECT av.Id, av.Word , av.Description, av.Pronounce
        FROM WordLike, av 
        where IdUser = ${id} and av.Id = WordLike.IdWord
        ORDER BY RAND()
        LIMIT 1`
    ),
    getRandomTopic: (IdUser, IdTopic) => db.load(
        `SELECT av.Id, av.Word , av.Description, av.Pronounce
        FROM TopicUserRemind, av, TopicUserRemindDetail 
        where TopicUserRemind.IdUser = ${IdUser} and TopicUserRemind.IdTopic = ${IdTopic} 
        and TopicUserRemindDetail.IdTopicUserRemind = TopicUserRemind.Id and av.Id = TopicUserRemindDetail.IdWord
        ORDER BY RAND()
        LIMIT 1`
    )
}