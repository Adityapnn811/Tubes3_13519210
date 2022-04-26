function main(body, sequence) {
    const fail = computeFail(sequence);
    var nearest = { index: 0, length: 0 };
    var i = 0, j = 0;
    while (i < body.length) {
        if (sequence.charAt(j) === body.charAt(i)) {
            if (j === sequence.length - 1) return [i - sequence.length + 1, null];
            i++; j++;
        }
        else if (j > 0) {
            if (j > nearest.length - 1) { nearest.index = i - j; nearest.length = j + 1; } // Addition to calculate bonus
            j = fail[j - 1];
        }
        else {
            i++;
        }
    }
    if (j > nearest.length - 1) { nearest.index = i - j; nearest.length = j + 1; }
    return [null, nearest];
};

function computeFail(sequence) {
    var fail = new Array(sequence.length - 1).fill(0);
    var i = 1, j = 0;
    while (i < sequence.length - 1) {
        if (sequence.charAt(j) === sequence.charAt(i)) { fail[i] = j + 1; i++; j++; }
        else if (j > 0)                                { j = fail[j - 1];           }
        else                                           { fail[i] = 0;     i++;      }
    }
    return fail;
};

module.exports.kmp = main;