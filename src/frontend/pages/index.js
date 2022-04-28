import {useState, useEffect} from 'react';
import { useRef } from "react";
import Head from 'next/head';
import Layout from '../components/layout';
import Header from '../components/header';
import {ButtonLink, Button} from '../components/button';

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
    return (
    <div className="items-center px-4 flex justify-center" >
            <div className="relative mr-3 w-2/5">
                <div className="absolute top-3 left-3 items-center" ref={clickPoint}>
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
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
                <ButtonLink text="Cari" href={`/searchResult`} tanggal={queryTanggal} penyakit={queryPenyakit}/> :
                <Button text="Cari"/>
            }
    </div>)
}

export default function Homepage(){
    return (
        <Layout>
            <Head>
                <title>DNA</title>
            </Head>
            <div className='flex h-screen justify-center items-center'>
                <div className='text-center w-full'>
                    <Header title="Do Not Arrest Website" className="text-6xl py-4 font-montserrat text-white"/>
                    <SearchBar/>
                    <ButtonLink 
                        text="Tes DNA Sekarang!" 
                        className={"bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg my-4 mx-2"}
                        href="/tesDNA"
                    />
                    <ButtonLink 
                        text="Masukkan DNA Penyakit" 
                        className={"bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg my-4 mx-2"}
                        href="/insertDNA"
                    />
                </div>
            </div>
        </Layout>
    )
}
