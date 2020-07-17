const db = require('../utils/db');
module.exports = {
    get: (email) => db.load(`select * from User where Email = '${email}'`),
    add: (table, item) => db.add(table, item),
    update: (table, item, id) => db.update(table, item, id),
    checkExist: (value, Id) => db.load(`select Id from User where Email=N'${value}'`),
    checkExistAccount: (value, Id) => db.load(`select * from User where Email=N'${value}'`),
}