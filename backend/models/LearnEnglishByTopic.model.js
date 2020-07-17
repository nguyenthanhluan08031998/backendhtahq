const db = require('../utils/db');
module.exports = {
    getAllPaging: async (table, condition, orderBy, page, rowPerPage) => {
        const total = await db.getNumberOfRows(table, condition)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, 0, parseInt(sum)),
            TotalCount: parseInt(sum)
        }
    },
    getVocabularyByTopic: async (idTopic) => db.load(`select * from Av where IdTopic like '%,${idTopic},%'`)
}