const db = require('../utils/db');
module.exports = {
    getUserData: (table, condition) => {
        return db.load(`select * from ${table} where (${condition}) or IsChange = 1`)
    },
    getAllUserData: (table, IdUser) => {
        if (IdUser != 0) {
            return db.load(`select * from ${table} where IdUser = ${IdUser}`)
        }
        else {
            return db.load(`select * from ${table}`)
        }
    },
    getBySyncId: (table, id) => db.load(`select * from ${table} where SynchronizedId = ${id}`),
    updateSyncById: (table, item) => db.update(table, item, item.Id),
    addNewData: (table, item) => db.add(table, item),
    updateChangeData: (table, item) => db.update(table, item, item.Id)
}