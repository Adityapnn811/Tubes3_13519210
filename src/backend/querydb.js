const mysql = require('mysql');

const con = mysql.createPool({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:     3306
});

async function main(query, args) {
    return new Promise(async (resolve, reject) => {
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