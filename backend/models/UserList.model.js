const db = require('../utils/db');
module.exports = {
    getAllPaging: async (table, condition, orderBy, page, rowPerPage) => {
        const total = await db.getNumberOfRows(table, condition)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, page, rowPerPage),
            TotalCount: parseInt(sum)
        }
    },
}