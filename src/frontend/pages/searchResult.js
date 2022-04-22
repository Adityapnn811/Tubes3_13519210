export default function SearchResult({searchResult}){
    return (
        <div>
            <h1>Hasil pencarian: {searchResult ? searchResult : "Hasil"}</h1>
        </div>
    )
}