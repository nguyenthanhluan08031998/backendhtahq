const db = require('../utils/db');

module.exports = {
    getRandomWord: async () => {
        const id = Math.floor(Math.random() * 40000) + 1;
        console.log(`random id: ${id}`);

        const words = await db.load(`SELECT AV.Word FROM AV 
                                        WHERE AV.Id = ${id}`);
        return words[0];
    },

    isWordValid: async (word, preWord) => {
        word = word.trim().toLowerCase()
        const ret = await db.load(`SELECT * FROM AV WHERE AV.Word = '${word}'`);
        console.log(`ret length: ${ret.length}`);
        if (ret.length === 0) {
            return false;
        }
        const lastChar = preWord.slice(-1);
        console.log(`${preWord}: ${lastChar}`);
        const firstChar = word.charAt(0);
        console.log(`${word}: ${firstChar}`);

        if (lastChar === firstChar) {
            return true;
        }
        return false;
    }
}