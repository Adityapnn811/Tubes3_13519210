function main(body, sequence){
    var i = sequence.length-1;
    var j = sequence.length-1;
    var nearest = { index: 0, length: 0 };
    const LastOccurence = lp(sequence);

    while (i < body.length){
        if (sequence.charAt(j) === body.charAt(i)){
            if (j === 0){
                return [i, null];

            } else {
                i--;
                j--;
            }

        } else {
            if (sequence.length - j - 1 > nearest.length) { nearest.index = i - j; nearest.length = sequence.length - j - 1; } // Addition to calculate bonus
            let idx = LastOccurence[body.charAt(i)];
            i = i + sequence.length - Math.min(j, 1+idx);
            j = sequence.length - 1;
        }
    }

    return [null, nearest];
}

function lp(sequence){
    let lastMolecules = {
                            "A" : -1,
                            "C" : -1,
                            "G" : -1,
                            "T" : -1
                        };

    for (let i = 0; i < sequence.length; ++i){
        seq_molecule = sequence[i];
        lastMolecules[seq_molecule] = i;
    }

    return lastMolecules;
}

module.exports.bm = main;