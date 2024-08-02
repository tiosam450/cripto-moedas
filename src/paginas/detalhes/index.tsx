import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "../home";

interface PropsData {
    data: Props
}

interface ErrorProps {
    error: string
}

type DataProps = PropsData | ErrorProps



export default function Detalhes() {
    const { cripto } = useParams()
    const navigate = useNavigate()
    const [conta, setConta] = useState<Props>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        try {
            fetch(`https://api.coincap.io/v2/assets/${cripto}`).then((response) => response.json()).then((data: DataProps) => {
                if ("error" in data) {
                    navigate('/')
                    return
                }
                const dados = data.data

                const formataPreco = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

                const formataPrecoCompacto = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' })

                const formato = {
                    ...dados,
                    precoFormatado: formataPreco.format(Number(dados.priceUsd)),
                    valorMercado: formataPrecoCompacto.format(Number(dados.marketCapUsd)),
                    volumeFormatado: formataPrecoCompacto.format(Number(dados.volumeUsd24Hr)),
                }

                setConta(formato)
                setLoading(false)
            })

        } catch (erro) {
            console.log(erro)
        }

    }, [])

    if (loading) {
        return (
            <h2>Carregando...</h2>
        )
    }

    return (
        <>
            <h1>Página de Detalhes</h1>
            <Link to='/'>Voltar</Link>
        </>
    )
}