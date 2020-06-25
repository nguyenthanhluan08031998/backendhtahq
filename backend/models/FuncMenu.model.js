const db = require('../utils/db');
module.exports = {
    all: () => db.load('select * from FuncMenu'),
    //checkExist: (value, Id) => db.load(`select Id from av where Word=N'${value}' and Id!=${Id}`),
    add: (table, item) => db.add(table, item),
    update: (table, item, id) => db.update(table, item, id),
    /*getAll: async () =>{
        return{
            ListGrid: await db.load('select * from FuncMenu')
        }
    },*/
    getAllPaging: async (table, condition, orderBy, page, rowPerPage) => {
        const total = await db.getNumberOfRows(table)
        var sum = JSON.stringify(total[0].Sum)
        return {
            ListGrid: await db.getAllPaging(table, condition, orderBy, page, rowPerPage),
            TotalCount: parseInt(sum)
        }
    }
}