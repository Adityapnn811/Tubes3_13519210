const mysql = require('mysql');

var con = mysql.createConnection({
    host: "donotarrest-server.mysql.database.azure.com",
    user: "dnaadmin@donotarrest-server",
    password: "Tubes@IF2211",
    database: "dna",
    port: 3306
});

async function main(query, callback) {
    await con.connect();

    await con.query(query, async (error, results, fields) => {
        if (error) callback(error, null);

        const data = {
            fields: fields,
            results: results,
        }

        await con.end();

        callback(null, data);
    });
};

module.exports.query = main;