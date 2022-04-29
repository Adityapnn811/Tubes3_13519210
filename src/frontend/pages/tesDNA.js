import Layout from '../components/layout';
import Header from '../components/header';
import {Button, ButtonLink} from '../components/button';
import {useState} from 'react';
import moment from "moment";

function Form(){
    const [isiFile, setIsiFile] = useState("");
    const [algoChoice, setAlgoChoice] = useState("KMP");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleFileChange = (e) => {
        setIsiFile("");
        let fr = new FileReader();
        fr.readAsText(e.target.files[0]);
        fr.onload = function() {
            setIsiFile(fr.result);
        };
    }

    const handleRadioChange = (e) => {
        setAlgoChoice(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        setHasSubmitted(true);
        if (algoChoice === "KMP"){
            const endpoint = 'https://do-not-arrest.herokuapp.com/api/kmp';
            
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({name:form.nama.value ,disease: form.penyakit.value, patient_dna: isiFile}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResult(await response.json());
            // console.log(await response.json());
            
            setIsLoading(false);
            
        } else {
            const endpoint = 'https://do-not-arrest.herokuapp.com/api/bm';
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({name:form.nama.value ,disease: form.penyakit.value, patient_dna: isiFile}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResult(await response.json());
            setIsLoading(false);
            // console.log(result);
        }
    }

    const createResult = () => {
        if (isLoading && hasSubmitted){
            return <ResultCard text={"Testing..."}/>
        } else if (hasSubmitted && !isLoading) {
            var string = "Gagal";
            if (!result["error"]){
                // console.log(result["match_res"]);
                var infected = result["match_res"]["afflicted"] ? "True" : "False"
                var date = moment().format("YYYY-MM-DD")
                // console.log(date)
                string = (result["match_res"]["name"] + " - " + date + " - " + result["match_res"]["disease"] + " - " + infected + " - " + result["match_res"]["percentage"] + "%")
                // console.log(string)
            } else {
                string = result["error"]
            }
            return <ResultCard text={string}/>
            // return <ResultCard text="Gagal"/>
        }
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className='w-3/4'>
                <div className='mb-6 items-center text-left'>
                    <label htmlFor="nama" className="block mb-2 text-m font-montserrat text-black">Nama Anda</label>
                    <input type="text" id="nama" className="shadow-sm bg-white/80 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Jane Doe" required></input>
                </div>

                <div className='mb-6 items-center text-left'>
                    <label htmlFor="penyakit" className="block mb-2 text-m font-montserrat text-black">Penyakit</label>
                    <input type="text" id="penyakit" className="shadow-sm bg-white/80 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Hepatitis A" required></input>
                </div>

                <div className='mb-6 items-center text-left'>
                    <label className="font-montserrat align-text-left" htmlFor="sekuens_DNA">Upload sekuens DNA</label>
                    <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer text-white bg-gray-700/20 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="sekuens_DNA" type="file" accept='.txt' required></input>
                    <div className="mt-1 text-sm font-montserrat" id="sekuens_DNA_help">Sebuah file .txt yang berisi sekuens DNA</div>
                </div>
                <p className='mb-1 items-center text-left font-montserrat'>Algoritma untuk tes</p>
                <fieldset>
                    <div onChange={handleRadioChange}>
                        <div className='items-center text-left' >
                            <input id="kmp" name="algo" value="KMP" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 mr-3" defaultChecked  type="radio" required></input>
                            <label className="font-montserrat align-text-left" htmlFor="kmp">Knuth-Morris-Pratt</label>
                        </div>
                        <div className='mb-6 items-center text-left' >
                            <input id="bm" name="algo" value="BM" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 mr-3" type="radio" required></input>
                            <label className="font-montserrat align-text-left" htmlFor="bm">Boyer-Moore</label>
                        </div>
                    </div>
                </fieldset>
                <Button
                    text="Tes!" 
                    className={"bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mb-4"} 
                    type="submit"
                />
            </form>
            {createResult()}
        </div>
    )
}

function ResultCard({text}){
    return(
        <div className="w-full text-center bg-white/80 px-6 py-3 rounded-lg mt-4">
            <h1 className="text-xl font-montserrat text-black">{text ? text : "Tanggal - Nama - Penyakit - isInfected - Kemiripan"}</h1>
        </div>
    )
}

export default function tesPage(){
    return (
        <Layout>
            <Head>
                <title>DNA</title>
            </Head>
            <div className='flex flex-row h-screen justify-center items-center'>
                <div className='w-1/2 '>
                    <ButtonLink text="Kembali" href="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mb-3" />
                    <div className='text-center w-full bg-gray-100/30 border border-gray-100/20 rounded-lg'>
                        <Header title="Tes DNA Anda" className="text-5xl py-4 font-montserrat text-white"/>
                        <Form/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}