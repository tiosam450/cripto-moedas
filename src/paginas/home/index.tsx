import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
        <h1>Página Home</h1>
        <Link to='/detalhes'>Detalhes</Link>
        </>
    )
}