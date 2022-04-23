export default function Header({title, className}){
    return <h1 className={className ? className : 'text-6xl py-4 font-roboto text-white'}>{title ? title : "Judul"}</h1>
}