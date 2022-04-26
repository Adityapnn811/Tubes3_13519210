function sanitate(inputDNA){
    return inputDNA.toUpperCase().replace(/[^(A|C|G|T)]/g, "")
}

function isDateDiseaseValidated(inputDateDisease){
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

    var listInputDisease = inputDateDisease.split(regex_delimiter); // [dd, mm|[Januari-Desember], yyyy, disease]
    if (listInputDisease[1] in dict){
        listInputDisease[1] = dict[listInputDisease[1]];
    }

    var date = listInputDisease.slice(0, 3).join('-'); // dd-mm-yyyy
    var disease = listInputDisease[3]; // disease

    // dd-mm-yyyy, leap year reviewed
    var regex_date = new RegExp(/^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g);

    return regex_date.test(date);
}

module.exports.regex = sanitate;
module.exports.regex = isDateDiseaseValidated;