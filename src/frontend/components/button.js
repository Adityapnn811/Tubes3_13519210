import { useRouter } from 'next/router'

function Button({text, clickHandler, className, type}){
    return (
        <button 
            className={className ? className : "bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg" }
            onClick={clickHandler}
            type={type ? type : "button"}
        >
            {text ? text : "Button"}
        </button>)
}

function ButtonLink({text, clickHandler, href, className, tanggal, penyakit, id}){
    const router = useRouter();
    href = href ? href : "/"
    const handleClick = (e) => {
        e.preventDefault();
        if (tanggal || penyakit){
            let varTanggal = tanggal ? tanggal : null;
            let varPenyakit = penyakit ? penyakit : null;
            router.push({
                pathname: href,
                query: {
                    tanggal: varTanggal,
                    penyakit: varPenyakit
                }
            });
        } else if (!tanggal && !penyakit) {
            router.push(href);
        }
    }
    return (
        <a href={href} onClick={handleClick}>
            <button 
            id={id ? id : ""}
            className={className ? className : "bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg" } onClick={clickHandler}>
                {text ? text : "Button"}
            </button>
        </a>)
}

export {Button, ButtonLink};