const db = require('../utils/db');
const common = require('../utils/common');
module.exports = {
    getWord: async (table, word) => {
        word = common.convertWord(word)
        return {
            ListGrid: await db.load(`select * from ${table} where Word = '${word}'`)
        }
    },
    getWordById: async (table, id) => {
        return {
            Word: await db.load(`select * from ${table} where Id = ${id}`)
        }
    },
    getWordByWord: async (table, word) => {
        word = common.convertWord(word)
        return {
            Word: await db.load(`select * from ${table} where Word ='${word}'`)
        }
    },
    add: (table, item) => db.add(table, item),
    update: (table, item, id) => db.update(table, item, id),

    checkExist: (value, IdUser) => db.load(`select * from WordLike where IdWord=${value} and IdUser = ${IdUser}`),
    deleteWordLike: (table, id) => db.delete(table, id),
    get: (rows, languageTable, e) => db.load(`select ${rows} from ${languageTable} where Word like '${e}%' limit 10`)
    // get: (rows) => db.load(`select ${rows} from AV`)
}