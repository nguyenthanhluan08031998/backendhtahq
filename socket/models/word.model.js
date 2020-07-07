const db = require('../utils/db');

module.exports = {
    getRandomWord: async () => {
        const id = Math.floor(Math.random() * 40000) + 1;
        console.log(`random id: ${id}`);
        
        const words = await db.load(`SELECT av.Word FROM av 
                                        WHERE av.Id = ${id}`);
        return words[0];
    },

    isWordValid: (word, preWord) => {
        const lastChar = preWord.slice(-1);
        console.log(`${preWord}: ${lastChar}`);
        const firstChar = word.charAt(0);
        console.log(`${word}: ${firstChar}`);
        
        if(lastChar === firstChar){
            console.log(`true`);
            return true;
        }
        return false;
    }
}