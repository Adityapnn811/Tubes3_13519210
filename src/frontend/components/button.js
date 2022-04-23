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

function ButtonLink({text, clickHandler, href, className}){
    const router = useRouter();
    href = href ? href : "/"
    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    }
    return (
        <a href={href} onClick={handleClick}>
            <button className={className ? className : "bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg" } onClick={clickHandler}>
                {text ? text : "Button"}
            </button>
        </a>)
}

export {Button, ButtonLink};