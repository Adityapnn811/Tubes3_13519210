<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"></link>

export default function Header({title, className}){
    return <h1 className={className ? className : 'text-6xl py-4 font-monstserrat text-white'}>{title ? title : "Judul"}</h1>
}