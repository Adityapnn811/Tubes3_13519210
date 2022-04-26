const fs = require('fs');
const { query } = require('./querydb');
const { kmp } = require('./kmp');
const { levenshtein } = require('./levenshtein');

const body = fs.readFileSync("../data/patient_dna.txt").toString();

const disease = "Diabetes Mellitus";

query("SELECT * FROM disease WHERE name=?", [disease], (err, data) => {
    if (err) console.error(err);

    const sequence = data.results[0].sequence;

    console.log(`DNA Sequence of ${disease}: ${sequence}`);

    var result = kmp(body, sequence);

    if (result[0]) {
        console.log(result[0]);
    } else {
        console.log(result[1]);
        var distance = levenshtein(body, sequence, result[1]);
        var percentage = Math.round((1 - distance / sequence.length) * 100);
        console.log(percentage);
    }
});