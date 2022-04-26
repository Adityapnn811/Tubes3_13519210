import Layout from '../components/layout';
import Header from '../components/header';
import {Button, ButtonLink} from '../components/button';
import {useState} from 'react';


function Form(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [isiFile, setIsiFile] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsiFile("");
        let fr = new FileReader();
        fr.readAsText(e.target.files[0]);
        fr.onload = function() {
            setIsiFile(fr.result);
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const data = new FormData();
        data.append('nama', form.nama.value);
        data.append('penyakit', form.penyakit.value);
        data.append('DNA', isiFile);
        // const dataJSON = JSON.stringify(data);
        
        // Tunggu Backend dulu
        // const endpoint = 'http://localhost:3000/api/tes';

        // const response = await fetch('/api/tesDNA', {
        //     method: 'POST',
        //     body: data,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // const result = await response.json();
        // console.log(result);
        console.log(data.get('nama'));
        console.log(data.get('penyakit'));
        console.log(data.get('DNA'));
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
                <Button
                    text="Tes!" 
                    className={"bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mb-4"} 
                    type="submit"
                />
            </form>
        </div>
    )
}

function ResultCard({text}){
    return(
        
        <div className="w-4/5 text-left bg-white/80 px-6 py-3 rounded-lg mb-4">
            <h1 className="text-3xl font-montserrat text-black">{text ? text : "Tanggal - Nama - Penyakit - isInfected - Kemiripan"}</h1>
        </div>
    )
}

export default function tesPage(){
    return (
        <Layout>
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