import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Props } from "../home";

interface PropsData{
    data: Props
}

export default function Detalhes(){
    const {cripto} = useParams()

    useEffect(()=>{

        try{
            fetch(`https://api.coincap.io/v2/assets/${cripto}`).then((response)=>response.json()).then((data: PropsData)=>{
                const dados = data.data
                console.log(dados)


            })
        }catch(erro){
            console.log(erro)
        }

    },[])

    return(
        <>
        <h1>Página de Detalhes</h1>
        <Link to='/'>Voltar</Link>
        </>
    )
}