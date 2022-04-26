const mysql = require('mysql');

var con = mysql.createPool({
    host:     "donotarrest-server.mysql.database.azure.com",
    user:     "dnaadmin@donotarrest-server",
    password: "Tubes@IF2211",
    database: "dna",
    port:     3306
});

async function main(query, args) {
    return await new Promise(async (resolve, reject) => {
        con.getConnection((err, connection) => {
            if (err) return reject(err);

            connection.query(query, args, (error, results, fields) => {
                if (error) {
                    connection.release();
                    return reject(error);
                }

                const data = {
                    fields: fields,
                    results: results,
                }

                connection.release();
                return resolve(data);
            });
        });
    });
};

module.exports.connectionPool = con;
module.exports.query = main;