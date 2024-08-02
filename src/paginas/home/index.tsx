import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import s from './home.module.css'

export interface Props {
    changePercent24Hr: string;
    explorer: string;
    id: string;
    marketCapUsd: string;
    maxSupply: string;
    name: string;
    priceUsd: string;
    rank: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
    precoFormatado: string;
    valorMercado: string;
    volumeFormatado: string;
}

interface DataProps{
    data: Props[]
}

export default function Home() {
    const [input, setInput] = useState<string>()
    const navigate = useNavigate()
    const [coins, setCoins] = useState<Props[]>([])
    const [mais, setMais] = useState(0)

    useEffect(() => {
        getData()
    }, [mais])

    async function getData() {
       await fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${mais}`).then(resposta => resposta.json()).then((data:DataProps) => {
            const dataCoin = data.data

            const formataPreco = Intl.NumberFormat('en-US',{style:'currency', currency:'USD'})
            const formataPrecoCompacto = Intl.NumberFormat('en-US',{style:'currency', currency:'USD', notation:'compact'})

            const moedaFormatada = dataCoin.map((item)=>{
                const formato = {
                    ...item,
                    precoFormatado: formataPreco.format(Number(item.priceUsd)),
                    valorMercado: formataPrecoCompacto.format(Number(item.marketCapUsd)),
                    volumeFormatado: formataPrecoCompacto.format(Number(item.volumeUsd24Hr)),
                }
                return formato
            })
            const listaCoins = [...coins, ...moedaFormatada]
            setCoins(listaCoins)
        })
    }

    function pesquisar(e: FormEvent) {
        e.preventDefault()
        navigate(`/detalhes/${input?.toLowerCase()}`)
    }

    function maisResultados(){
        setMais(mais + 10)
    }

    return (
        <section className={s.container}>

            <Link to='/' className={s.logo}><img src={logo} alt="Logo" /></Link>

            <form className={s.form} onSubmit={pesquisar}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                <button><IoSearch /></button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Moeda</th>
                        <th>Valor de mercado</th>
                        <th>Preço</th>
                        <th>Volume</th>
                        <th>Mudança 24h</th>
                    </tr>
                </thead>

                <tbody>
                    {coins.length > 0 && coins.map((item)=>(
                        <tr className={s.tr} key={item.id}>
                        <td>
                            <div className={s.nome}>
                                <img className={s.iconeCoin} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="" />
                                <Link to={`/detalhes/${item.name.toLocaleLowerCase()}`}><span>{item.name} | {item.symbol}</span></Link>
                            </div>
                        </td>

                        <td data-label='Valor de mercado:'>
                            {item.valorMercado}
                        </td>

                        <td data-label='Preço:'>
                            {item.precoFormatado}
                        </td>

                        <td data-label='Volume:'>
                            {item.volumeFormatado}
                        </td>

                        <td className={Number(item.changePercent24Hr) > 0 ? s.verde : s.verm} data-label='Mudança 24h:'>
                            <span>{Number(item.changePercent24Hr).toFixed(2)}%</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button className={s.btnMaisResultados} onClick={maisResultados}>Mais resultados</button>

        </section>

    )
}