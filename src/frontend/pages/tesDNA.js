import Layout from '../components/layout';
import Header from '../components/header';
import {Button, ButtonLink} from '../components/button';


function Form(){
    return(
        <div className="flex flex-col items-center justify-center">
            <form action="/tesDNA" method="post" className='w-3/4'>
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
                    <input className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer text-white bg-gray-700/20 border-gray-600 placeholder-gray-400" aria-describedby="user_avatar_help" id="sekuens_DNA" type="file" accept='.txt' required></input>
                    <div className="mt-1 text-sm font-montserrat" id="sekuens_DNA_help">Sebuah file .txt yang berisi sekuens DNA</div>
                </div>
            </form>
            <Button
                text="Tes!" 
                className={"bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg mb-4"} 
                type="submit"
            />
        </div>
    )
}

export default function tesPage(){
    return (
        <Layout>
            <div className='flex h-screen justify-center items-center'>
                <div className='text-center w-1/2 bg-gray-100/30 border border-gray-100/20 rounded-lg'>
                    <Header title="Tes DNA Anda" className="text-5xl py-4 font-roboto text-white"/>
                    
                    <Form/>
                </div>
            </div>
        </Layout>
    )
}