const db = require('../utils/db');
module.exports = {
    getAllPaging: async (table, condition, orderBy, page, rowPerPage, linkTable, rows) => {
        const total = await db.getNumberOfRows(table)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, page, rowPerPage, linkTable, rows),
            TotalCount: parseInt(sum)
        }
    },
    getAllHistory: (IdUser) => db.load(`select * from SearchHistory where IdUser = ${IdUser}`),
    getAllHistoryAngPaging: (IdUser) => db.load(`
    select A.newId as Id, A.IdWord, A.Word from
        (
            select max(TimeSearch), searchhistory.Id as newId, IdWord, Word 
            from SearchHistory, av 
            where IdUser = ${IdUser} and av.Id = SearchHistory.IdWord 
            Group By IdWord
        ) as A    
    `)
}