// Library Imports
const { query } = require('./querydb');
const { kmp } = require('./kmp');
const { levenshtein } = require('./levenshtein');

// Api Imports
const bodyParser = require('body-parser');
const cors = require('cors');
const Express = require('express');
const app = Express();

app.use(cors());
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/disease", async (req, res) => {
    // pass data as json object
    const disease = req.body.disease;
    const sequence = req.body.sequence;

    // Catch unexpected original json
    if (disease === undefined || sequence === undefined) return res.send({
        error: "Data Undefined",
        original: req.body
    });

    query("INSERT INTO disease VALUES (DEFAULT, ?, ?)", [disease, sequence], (err, data) => {
        // Catch unexpected error
        if (err) return res.send({
            error: err.message,
            original: req.body
        });
        // Empty Return
        if (data.results === undefined) return res.send({
            error: "Query returns empty results, disease likely not reccorded in database.",
            original: req.body
        });

        return res.send({
            result: data,
            original: req.body
        })
    });
});

app.post("/api/kmp", async (req, res) => {
    // pass data as json object
    const disease = req.body.disease;
    const body = req.body.patient_dna;

    // Catch unexpected original json
    if (disease === undefined || body === undefined) return res.send({
        error: "Data Undefined",
        original: req.body
    });

    // query database
    query("SELECT * FROM disease WHERE name=?", [disease], (err, data) => {
        // Catch unexpected error
        if (err) return res.send({
            error: err.message,
            original: req.body
        });
        // Empty Return
        if (data.results[0] === undefined) return res.send({
            error: "Query returns empty results, disease likely not reccorded in database.",
            original: req.body
        });

        const sequence = data.results[0].sequence;
        var result = kmp(body, sequence);
        if (result[0]) {
            // Patient Afflicted 100%
            return res.send({
                afflicted: true,
                index: result[0],
                percentage: 100
            });
        } else {
            // Find closest
            var afflicted = false;
            var distance = levenshtein(body, sequence, result[1]);
            var percentage = Math.round((1 - distance / sequence.length) * 100);
            // If levenshtein returns over 80% match
            if (percentage > 80) afflicted = true;
            return res.send({
                afflicted: afflicted,
                index: result[1].index,
                percentage: percentage
            });
        }
    });
});

app.get("/api/patients", async (req, res) => {
    query("SELECT * FROM patient", [], (err, data) =>{
        // Catch unexpected error
        if (err) return res.send({
            error: err.message,
            original: req.body
        });
        // Empty Return
        if (data.results[0] === undefined) return res.send({
            error: "Query returns empty results, no patients exist yet.",
            original: req.body
        });

        return res.send({
            result: data,
            original: req.body
        });
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});