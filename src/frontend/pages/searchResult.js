import Layout from '../components/layout';
import Header from '../components/header';
import { useRef } from "react";
import {ButtonLink, Button} from '../components/button';
import { useRouter } from 'next/router';
import {useState} from 'react';

function SearchBar(){
    const [queryTanggal, setQueryTanggal] = useState("");
    const [queryPenyakit, setQueryPenyakit] = useState("");
    const [inputValid, setInputValid] = useState(false);
    const clickPoint = useRef();
    const handleFocus = () => {
        clickPoint.current.style.display = "none";
    };

    const handleBlur = () => {
        clickPoint.current.style.display = "block";
    };

    const handleInputField = async (e) => {
        e.preventDefault();
        const regex1 = /(\d{1,2} [A-Z][a-z]* \d{4})* *([a-zA-Z0-9].*)*/g; // tanggal<spasi>penyakit
        const regex2 = /([a-zA-Z0-9].*)* *(\d{1,2} [A-Z][a-z]* \d{4})*/g; // penyakit<spasi>tanggal
        
        const input = document.getElementById('searchInput').value;
        
        const match1 = [...input.matchAll(regex1)];
        const match2 = [...input.matchAll(regex2)];
        if (match1){
            setQueryTanggal(match1[0][1]);
            setQueryPenyakit(match1[0][2]);
            // console.log(match1[0])
            // console.log(queryTanggal + "-" + queryPenyakit)
            setInputValid(true);
        } else if (match2){
            setQueryPenyakit(match1[0][1]);
            setQueryTanggal(match1[0][2]);
            setInputValid(true);
        }

        // jgn lupa dicomment
        // console.log(searchQuery)
    }

    // // cari saat klik enter
    // document.getElementById('search').onkeydown = function(e){
    //     if(e.key == "Enter"){
    //       // submit
    //     }
    //  };

    return (
    <div className="items-center px-4 flex justify-center w-full mb-6" >
            <div className="relative mr-3 w-3/4">
                <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input
                    id="searchInput"
                    type="text"
                    className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                    placeholder="Cari Nama Penyakit atau Tanggal disini"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputField}
                />
            </div>
            {
                inputValid ? 
                <ButtonLink text="Cari" href={`/searchResult`} tanggal={queryTanggal} penyakit={queryPenyakit} id="search"/> :
                <Button text="Cari"/>
            }
    </div>)
}

function ResultCard({text}){
    return(
        
        <div className="w-4/5 text-left bg-white/80 px-6 py-3 rounded-lg mb-4">
            <h1 className="text-3xl font-montserrat text-black">{text ? text : "Tanggal - Nama - Penyakit - isInfected - Kemiripan"}</h1>
        </div>
    )
}

export default function SearchResult({}){
    // Ini nanti diganti ke fetch dari api
    const dataPenyakit = [
        {
            nama: "Aditya",
            tanggal: "13 April 2020",
            penyakit: "Covid 19",
            isInfected: true,
            kemiripan: 0.8
        },
        {
            nama: "Marques",
            tanggal: "13 April 2020",
            penyakit: "Herpes",
            isInfected: false,
            kemiripan: 0.8
        },
    ]

    // Inisiasi variabel query
    const query = useRouter().query;

    // Fungsi yang iterasi result
    const createResultCard = () => {
        var rows = []
        dataPenyakit.forEach(e => {
            if (e.tanggal == query["tanggal"] || e.penyakit == query["penyakit"]){
                let stringResult = e.nama + " - " + e.tanggal + " - " + e.penyakit + " - " + e.isInfected + " - " + e.kemiripan
                rows.push(<ResultCard text={stringResult}/>)
            }
        })
        return rows.map((row) => row);
    }

    return (
        <Layout>
            <div className="flex flex-col justify-center">
                <div>
                    <ButtonLink text="Kembali" href="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-5 ml-8" />
                </div>
                <div className="w-full items-center flex flex-col">
                    <div className="flex flex-col items-center justify-center w-4/5">
                        <Header title="Hasil Tes" className="text-5xl py-4 font-montserrat text-white mb-6"/>
                        <SearchBar/>
                        {createResultCard()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}