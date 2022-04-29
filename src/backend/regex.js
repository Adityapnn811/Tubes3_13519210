function sanitate(inputDNA){
    const regexDNA = /^[ATCG]+$/;
    const match = [...inputDNA.matchAll(regexDNA)];
    if (regexDNA.test(inputDNA) && !(match.length > 2)){
        return inputDNA
    } else {
        return ""
    }
}

function isDateDiseaseValidated(inputDateDisease, listOfDiseases){
// Return true if data and disease inputs are valid

// Valid:
//    <dd-mm-yyyy disease>
//    <dd/mm/yyyy disease>
//    <dd [Januari-Desember] yyyy disease>
//    Be validated on leap year and recognized diseases

    const regex_delimiter = /[\s/-]/;
    const dict =  {
                    "Januari"   : "01",
                    "Februari"  : "02",
                    "Maret"     : "03",
                    "April"     : "04",
                    "Mei"       : "05",
                    "Juni"      : "06",
                    "Juli"      : "07",
                    "Agustus"   : "08",
                    "September" : "09",
                    "Oktober"   : "10",
                    "November"  : "11",
                    "Desember"  : "12",
                };

    var listInputDateDisease = inputDateDisease.split(regex_delimiter); // [dd, mm|[Januari-Desember], yyyy, disease]
    if (listInputDateDisease[1] in dict){
        listInputDateDisease[1] = dict[listInputDateDisease[1]];
    }

    var date = listInputDateDisease.slice(0, 3).join('-'); // dd-mm-yyyy
    var regex_date = new RegExp(/^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g);
    // dd-mm-yyyy, leap year reviewed

    var disease = listInputDateDisease[3]; // disease
    let isDiseaseRecognized = false;

    for (let i = 0; i < listOfDiseases.length; ++i){
        if (disease === listOfDiseases[i]){
            isDiseaseRecognized = true;
        }
    }

    return regex_date.test(date) && isDiseaseRecognized;
}

module.exports.sanitate = sanitate;
module.exports.validate = isDateDiseaseValidated;