import Layout from '../components/layout';

export default function SearchResult({searchResult}){
    return (
        <Layout>
            <h1>Hasil pencarian: {searchResult ? searchResult : "Hasil"}</h1>
        </Layout>
    )
}