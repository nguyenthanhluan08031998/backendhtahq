const db = require('../utils/db');
module.exports = {
    getAllPaging: async (table, condition, orderBy, page, rowPerPage, linkTable, rows) => {
        const total = await db.getNumberOfRows(!linkTable ? table : `${table},${linkTable}`, condition)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, page, rowPerPage, linkTable, rows),
            TotalCount: parseInt(sum)
        }
    },
    getAllFavorite: (IdUser) => db.load(`select * from WordLike where IdUser = ${IdUser}`)
}