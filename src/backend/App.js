const mysql = require('mysql');
const { query } = require('./querydb');

query("SELECT * FROM disease LIMIT 5", (err, data) => {
    if (err) console.error(err);
    console.log(data)
});