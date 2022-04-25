const fs = require('fs');
const { query } = require('./querydb');
const { kmp } = require('./kmp');

const body = fs.readFileSync("../data/patient_dna.txt").toString();

query("SELECT * FROM disease WHERE name=?", ["Diabetes Mellitus"], (err, data) => {
    if (err) console.error(err);

    const sequence = data.results[0].sequence;

    var result = kmp(body, sequence);

    if (result[0]) {
        console.log(result[0]);
    } else {
        console.log(result[1])
    }
});