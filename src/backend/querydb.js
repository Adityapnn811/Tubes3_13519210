const mysql = require('mysql');

var con = mysql.createPool({
    host: "donotarrest-server.mysql.database.azure.com",
    user: "dnaadmin@donotarrest-server",
    password: "Tubes@IF2211",
    database: "dna",
    port: 3306
});

async function main(query, args, callback) {
    await con.getConnection((err, connection) => {
        if (err) return callback(err, null);
        connection.query(query, args, (error, results, fields) => {
            if (error) {
                connection.release();
                return callback(error, null);
            }

            const data = {
                fields: fields,
                results: results,
            }

            return callback(null, data);
        });
    });
};

module.exports.query = main;