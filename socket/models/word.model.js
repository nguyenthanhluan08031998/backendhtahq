const db = require('../utils/db');

module.exports = {
    getRandomWord: async () => {
        const words = await db.load(`SELECT Word FROM av  
                                ORDER BY RAND ( )  
                                LIMIT 1  `);
        return words[0];
    }
}