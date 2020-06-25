const { promisify } = require('util')
const pool = require("./pool")

const pool_query = promisify(pool.query).bind(pool)

var is_date = function (input) {
    if (!isNaN(Date.parse(input)) && typeof input == typeof "string" && input.includes("T")) {
        return true
    }
    return false;
};

module.exports = {
    load: sql => pool_query(sql),
    add: (table, item) => {
        const key = Object.keys(item).filter(x => x != "Id").join(',')
        const value = Object.keys(item).filter(x => x != "Id").map(x => {
            var convertValue = ""
            if (item[x] || item[x] == 0) {
                if (is_date(item[x])) {
                    convertValue = "N'" + new Date(item[x]).toISOString().slice(0, 19).replace('T', ' ') + "'"
                }
                else {
                    if (typeof item[x] == typeof "string") {
                        convertValue = `N'${item[x].split("'").join("''")}'`
                    }
                    else
                        convertValue = `N'${item[x]}'`
                }
            }
            else {
                convertValue = "null"
            }
            return convertValue
        }).join(',')
        console.log(`insert into ${table} (${key}) values (${value})`)
        return pool_query(`insert into ${table} (${key}) values (${value})`)
    },
    update: (table, item, id) => {
        const value = Object.keys(item).filter(x => x != "Id").map(x => {
            if (item[x] || item[x] == 0) {
                if (is_date(item[x])) {
                    return `${x} = N'${new Date(item[x]).toISOString().slice(0, 19).replace('T', ' ')}'`
                }
                else {
                    if (typeof item[x] == typeof "string") {
                        return `${x} = N'${item[x].split("'").join("''")}'`
                    }
                    else {
                        return `${x} = N'${item[x]}'`
                    }
                }
            }
            else {
                return `${x} = null`
            }
        }).join(',');
        console.log(`update ${table} set ${value} where id=${id}`)
        return pool_query(`update ${table} set ${value} where id=${id}`)
    },
    getAllPaging: (table, condition, orderBy, page, rowPerPage, linkTable, rows) => {
        if (!linkTable) {
            return pool_query(`SELECT *
            FROM ${table}
            ${condition ? `WHERE ${condition}` : ""} 
            ORDER BY ${orderBy || "Id"}
            LIMIT ${rowPerPage}
            OFFSET ${page * rowPerPage}`)
        }
        else {
            return pool_query(`SELECT ${rows}
            FROM ${table},${linkTable}
            ${condition ? `WHERE ${condition}` : ""} 
            ORDER BY ${orderBy || "Id"}
            LIMIT ${rowPerPage}
            OFFSET ${page * rowPerPage}`)
        }
    },
    getNumberOfRows: (table, condition) => pool_query(`select count(*) as Sum from ${table} ${condition ? `WHERE ${condition}` : ""} `),
    delete: (table, id) => {
        return pool_query(`delete from ${table} where Id=${id}`)
    },
}