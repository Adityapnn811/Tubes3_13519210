import Link from 'next/link';

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

function ButtonLink({text, clickHandler, href, className}){
    return (
        <button className={className ? className : "bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg" } onClick={clickHandler}>
            <Link href={href ? href : "/"}><a>{text ? text : "Button"}</a></Link>
        </button>)
}

export {Button, ButtonLink};