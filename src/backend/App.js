// Api Imports
const bodyParser = require('body-parser');
const cors = require('cors');
const Express = require('express');
require('dotenv').config();

// Environment Import
const PORT = process.env.PORT || '3001';

// Library Imports
const { query } = require('./querydb');
const { kmp } = require('./kmp');
const { bm } = require('./bm')
const { levenshtein } = require('./levenshtein');
const { sanitate } = require('./regex');

// Express Initialization
const app = Express();

// Middleware Initialization
app.use(cors({ origin: true }));
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Constant for route strings, for non constant, declare var before route
const POST_DISEASE = "/api/disease";
const POST_KMP = "/api/kmp";
const POST_BM = "/api/bm";
const GET_PATIENTS = "/api/patients";

app.post(POST_DISEASE, async (req, res) => {
    // pass data as json object
    const disease = req.body.disease;
    const sequence = sanitate(req.body.sequence);

    // Catch unexpected original json
    if (disease === undefined || sequence === undefined) {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_DISEASE}`);
        // Catch Error
        return res.send({
            error: "Data Undefined",
            original: req.body,
            sanitized: sequence
        });
    }

    // Catch Empty Sanitized Input
    if (sequence === '') {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_DISEASE}`);
        // Catch Error
        return res.send({
            error: "Input DNA Sequence Empty Or Erroneous",
            origin: req.body,
            sanitized: sequence
        });
    }

    query("INSERT INTO disease VALUES (DEFAULT, ?, ?)", [disease, sequence]).then(
    // On Success
    (data) => {
        // Empty Return
        if (data.results === undefined) {
            // Log that an error occured
            console.error(`Error occurred in route: ${POST_DISEASE}`);
            // Catch Error
            return res.send({
                error: "Query returns empty results, disease likely not reccorded in database.",
                original: req.body,
                sanitized: sequence
            });
        }

        // Send Results
        return res.send({
            result: data,
            original: req.body,
            sanitized: sequence
        })
    },
    // On Error
    (err) => {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_DISEASE}`);
        // Catch unexpected error
        if (err) return res.send({
            error: err.message,
            original: req.body,
            sanitized: sequence
        });
    });
});

app.post(POST_KMP, async (req, res) => {
    // pass data as json object
    const name = req.body.name;
    const disease = req.body.disease;
    const body = sanitate(req.body.patient_dna);

    // Catch unexpected original json
    if (name === undefined || disease === undefined || body === undefined) {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_KMP}`);
        // Catch Error
        return res.send({
            error: "Data Undefined",
            original: req.body,
            sanitized: body
        });
    }

    // Catch Empty Sanitized Input
    if (body === '') {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_KMP}`);
        // Catch Error
        return res.send({
            error: "Input DNA Sequence Empty Or Erroneous",
            origin: req.body,
            sanitized: body
        });
    }

    // query database
    query("SELECT * FROM disease WHERE name=?", [disease]).then(
    // On Success
    (data) => {
        // Empty Return
        if (data.results[0] === undefined) {
            // Log that an error occured
            console.error(`Error occurred in route: ${POST_KMP}`);
            // Catch Error
            return res.send({
                error: "Query returns empty results, disease likely not recorded in database.",
                original: req.body,
                sanitized: body
            });
        }

        const sequence = data.results[0].sequence;
        var result = kmp(body, sequence);
        var returnObj = { name: name, disease: disease, percentage: 0, afflicted: false, index: null };

        if (result[0] !== null) {
            // Patient Afflicted 100%
            returnObj.afflicted = true;
            returnObj.index = result[0];
            returnObj.percentage = 100;
        } else {
            returnObj.index = result[1].index;
            returnObj.percentage = Math.round(
                (1 - levenshtein(body, sequence, result[1]) / sequence.length)
                * 100);
            // If levenshtein returns over 80% match
            if (returnObj.percentage > 80) returnObj.afflicted = true;
        }
        // Pass Promise to database inserter
        return new Promise((resolve, reject) => {
            resolve(returnObj);
        });
    })
    .then(
    // Get returnObj
    (data) => {
        var arguments = new Array(4);
        arguments[0] = data.name;
        arguments[1] = data.disease;
        arguments[2] = data.percentage;
        arguments[3] = data.afflicted;
        return new Promise(async (resolve, reject) => {
            var status = await query("INSERT INTO patient VALUES(DEFAULT, ?, ?, DEFAULT, ?, ?)", arguments)
            .then(
            // Gotten Insert Status
            (status) => { return status; });
            resolve({
                data: data,
                status: status
            });
        })
    })
    .then(
    // On Success
    (all) => {
        // Empty Return
        if (all.status.results === undefined) {
            // Log that an error occured
            console.error(`Error occurred in route: ${POST_KMP}`);
            // Catch Error
            return res.send({
                error: "Failed to insert into database.",
                original: req.body,
                sanitized: body
            });
        }

        // Send Results
        return res.send({
            match_res: all.data,
            status: all.status,
            original: req.body,
            sanitized: body
        });
    })
    .catch(
    // On Error
    (err) => {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_KMP}`);
        // Catch unexpected error
        if (err) return res.send({
            error: err.message,
            original: req.body,
            sanitized: body
        });
    });
});

app.post(POST_BM, async (req, res) => {
    // pass data as json object
    const name = req.body.name;
    const disease = req.body.disease;
    const body = sanitate(req.body.patient_dna);

    // Catch unexpected original json
    if (name === undefined || disease === undefined || body === undefined) {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_BM}`);
        // Catch Error
        return res.send({
            error: "Data Undefined",
            original: req.body,
            sanitized: body
        });
    }

    // Catch Empty Sanitized Input
    if (body === '') {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_BM}`);
        // Catch Error
        return res.send({
            error: "Input DNA Sequence Empty Or Erroneous",
            origin: req.body,
            sanitized: body
        });
    }

    // query database
    query("SELECT * FROM disease WHERE name=?", [disease]).then(
    // On Success
    (data) => {
        // Empty Return
        if (data.results[0] === undefined) {
            // Log that an error occured
            console.error(`Error occurred in route: ${POST_BM}`);
            // Catch Error
            return res.send({
                error: "Query returns empty results, disease likely not recorded in database.",
                original: req.body,
                sanitized: body
            });
        }

        const sequence = data.results[0].sequence;
        var result = bm(body, sequence);
        var returnObj = { name: name, disease: disease, percentage: 0, afflicted: false, index: null };

        if (result[0] !== null) {
            // Patient Afflicted 100%
            returnObj.afflicted = true;
            returnObj.index = result[0];
            returnObj.percentage = 100;
        } else {
            returnObj.index = result[1].index;
            returnObj.percentage = Math.round(
                (1 - levenshtein(body, sequence, result[1]) / sequence.length)
                * 100);
            // If levenshtein returns over 80% match
            if (returnObj.percentage > 80) returnObj.afflicted = true;
        }
        // Pass Promise to database inserter
        return new Promise((resolve, reject) => {
            resolve(returnObj);
        });
    })
    .then(
    // Get returnObj
    (data) => {
        var arguments = new Array(4);
        arguments[0] = data.name;
        arguments[1] = data.disease;
        arguments[2] = data.percentage;
        arguments[3] = data.afflicted;
        return new Promise(async (resolve, reject) => {
            var status = await query("INSERT INTO patient VALUES(DEFAULT, ?, ?, DEFAULT, ?, ?)", arguments)
            .then(
            // Gotten Insert Status
            (status) => { return status; });
            resolve({
                data: data,
                status: status
            });
        })
    })
    .then(
    // On Success
    (all) => {
        // Empty Return
        if (all.status.results === undefined) {
            // Log that an error occured
            console.error(`Error occurred in route: ${POST_BM}`);
            // Catch Error
            return res.send({
                error: "Failed to insert into database.",
                original: req.body,
                sanitized: body
            });
        }

        // Send Results
        return res.send({
            match_res: all.data,
            status: all.status,
            original: req.body,
            sanitized: body
        });
    })
    .catch(
    // On Error
    (err) => {
        // Log that an error occured
        console.error(`Error occurred in route: ${POST_BM}`);
        // Catch unexpected error
        if (err) return res.send({
            error: err.message,
            original: req.body,
            sanitized: body
        });
    });
});

app.get(GET_PATIENTS, async (req, res) => {
    query("SELECT * FROM patient", []).then(
    // On Success
    (data) => {
        // Empty Return
        if (data.results[0] === undefined) {
            // Log that an error occured
            console.error(`Error occurred in route: ${GET_PATIENTS}`);
            // Catch Error
            return res.send({
                error: "Query returns empty results, no patients exist yet.",
                original: req.body
            });
        }

        // Return result object
        return res.send({
            result: data,
            original: req.body
        });
    })
    .catch(
    // On Error
    (err) => {
        // Log that an error occured
        console.error(`Error occurred in route: ${GET_PATIENTS}`);
        // Catch unexpected error
        return res.send({
            error: err.message,
            original: req.body
        });
    });
});

app.listen(PORT, () => {
    console.log(`INFO: Started on port: ${PORT}`);
});