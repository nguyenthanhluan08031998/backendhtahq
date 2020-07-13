const express = require('express')
const router = express.Router();
const model = require('../models/Sync.model');


function promiseToString(promise) {
    return JSON.parse(JSON.stringify(promise));
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

router.post('/sendDataToServer', async (req, res) => {
    try {
        var list = req.body
        var error = null
        var returnData = []

        await asyncForEach(list, async (x) => {
            var table = x.table
            var data = x.data
            await asyncForEach(data, async (row, i) => {
                if (row.IdServer == 0) {
                    const newRow = { ...row, Id: 0 }
                    delete newRow['IdServer']
                    var result = await model.addNewData(table, newRow)
                    if (result.affectedRows > 0 && result.insertId) {
                        row.IdServer = result.insertId
                    }
                    else {
                        error = `Fail to insert table ${table}`
                    }

                }
                else if (row.IsChange == 1 && row.IdServer > 0) {
                    const newRow = row
                    newRow.Id = row.IdServer
                    delete newRow['IdServer']
                    var result = await model.updateChangeData(table, newRow)
                    if (result.affectedRows > 0) {

                    }
                    else {
                        error = "Fail to update changed data"
                    }
                }
                data[i] = row
            })
            returnData = [...returnData, {
                table,
                data
            }]
        });
        if (!error) {
            res.json(list)
        }
        else {
            res.json({ error })
        }
    }
    catch (e) {
        res.json({ error: e })
    }

})

router.post('/getDataFromServer', async (req, res) => {
    try {
        var list = req.body
        var IdUser = req.query.IdUser
        var data = []

        await asyncForEach(list, async (row) => {
            var promise = null
            var table = row.table
            var condition = row.listIds.length == 0 ? null : row.listIds.map(id => `Id != ${id}`).join(" and ")
            if (!condition) {
                promise = await model.getAllUserData(table, IdUser)
            }
            else {
                promise = await model.getUserData(table, condition, IdUser)
            }
            var items = promiseToString(promise)
            if (items && items.length > 0) {
                data = [...data, {
                    table,
                    data: [...items]
                }]
            }
        });
        res.json(promiseToString(data))
    }
    catch (e) {
        res.json({ error: e })
    }

})

module.exports = router;