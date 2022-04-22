import {useState, useEffect} from 'react';
import Link from 'next/link';


function Header({title}){
    return <h1>{title ? title : "Ini adalah default title ketika title null"}</h1>
}

export default function Homepage(){
    const [jmlKlik, setJmlKlik] = useState(0);
    function handleKlik(){
        setJmlKlik(jmlKlik + 1);
    }

    return (
        <div>
            <Header title="Title hehe"/>
            <p>jmlKlik: {jmlKlik}</p>
            <button onClick={handleKlik}>Klik</button>
            <button onClick={handleKlik}><Link href="/searchResult"><a>Search</a></Link></button>
        </div>
    )
}
