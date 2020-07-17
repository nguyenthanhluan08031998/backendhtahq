const db = require('../utils/db');
module.exports = {
    all: () => db.load('select * from Topic'),
    add: (table, item) => db.add(table, item),
    checkExist: (value, Id) => db.load(`select Id from Topic where NameTopic=N'${value}' and Id!=${Id}`),
    /*CheckDuplicate:(table, col, Id, value)=>{
        const result = pool_query(`select ${col} from ${table} where ${col} = ${value} and and Id!=${Id}`);
        if (Object.keys(result).length == 0) {
            return true;
        } else {
            return false
        }
    },*/
    update: (table, item, id) => db.update(table, item, id),
    getAllPaging: async (table, condition, orderBy, page, rowPerPage) => {
        const total = await db.getNumberOfRows(table)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, page, rowPerPage),
            TotalCount: parseInt(sum)
        }
    },
    getAllTopicWithNumberWord: () => db.load(`select Topic.Id, Topic.NameTopic, Topic.Translate, count(*) as NumberWord from Topic, av where IdTopic like concat('%,',Topic.Id,',%') group by Topic.Id`)
}