import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "../home";
import style from './detalhes.module.css'

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
            <div className={style.container}>
                <div className={style.dados}>
                    <div className={style.info}><img className={style.img} src={`https://assets.coincap.io/assets/icons/${conta?.symbol.toLowerCase()}@2x.png`} alt="" />
                    <h1>{conta?.name}</h1></div>
                    <div className={style.info}><span>Valor de Mercado: </span><h3>{conta?.valorMercado}</h3></div>
                    <div className={style.info}><span>Preço: </span><h3>{conta?.precoFormatado}</h3></div>
                    <div className={style.info}><span>Volume: </span><h3>{conta?.volumeFormatado}</h3></div>
                    <div className={style.info}><span>Mudança 24h: </span><h3 className={ (Number(conta?.changePercent24Hr)) > 0 ? style.verde : style.verm }>{Number(conta?.changePercent24Hr).toFixed(2)}</h3></div>
                    <Link to='/' className={style.btnMaisResultados}>Voltar</Link>
                </div>
            </div>
        </>
    )
}