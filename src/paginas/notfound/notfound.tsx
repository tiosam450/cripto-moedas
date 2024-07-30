import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <>
        <h1>Página não encontrada</h1>
        <Link to='/'>Voltar</Link>
        </>
    )
}