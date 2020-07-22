const db = require('../utils/db');
module.exports = {
    checkExist: (value, Id) => db.load(`select Id from AV where Word=N'${value}' and Id!=${Id}`),
    add: (table, item) => db.add(table, item),
    update: (table, item, id) => db.update(table, item, id),
    getAllPaging: async (table, condition, orderBy, page, rowPerPage) => {
        const total = await db.getNumberOfRows(table, condition)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, page, rowPerPage),
            TotalCount: parseInt(sum)
        }
    },
    get: (rows) => db.load(`select ${rows} from Topic`),
    getWordByTopic: (Id) => db.load(`select * from AV where IdTopic like'%,${Id},%'`)
}