function main(body, sequence, nearest) {
    var distances = new Array(Math.min(sequence.length + 1, body.length - nearest.index)).fill().map(() => new Array(sequence.length + 1).fill(0));

    for (let i = 0; i < distances.length; i++) {
        distances[i][0] = i;
    }

    for (let j = 0; j < sequence.length + 1; j++) {
        distances[0][j] = j;
    }

    var a = 0, b = 0, c = 0;

    for (let i = 1; i < distances.length; i++) {
        for (let j = 1; j < sequence.length + 1; j++) {
            if (body.charAt(nearest.index + i - 1) === sequence.charAt(j - 1)) {
                distances[i][j] = distances[i - 1][j - 1];
            } else {
                a = distances[i][j - 1];
                b = distances[i - 1][j];
                c = distances[i - 1][j - 1];

                distances[i][j] = Math.min(a, b, c) + 1;
            }
        }
    }
    return distances[distances.length - 1][sequence.length];
}

module.exports.levenshtein = main;