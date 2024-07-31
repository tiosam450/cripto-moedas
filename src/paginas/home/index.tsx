import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import s from './home.module.css'

export default function Home() {
    const [input, setInput] = useState<string | number>()
    const navigate = useNavigate()
    const [coins, setCoins] = useState()

    useEffect(()=>{
        getData()
    }, [])

    async function getData(){
        fetch("https://api.coincap.io/v2/assets?limit=10&offset=0").then(resposta => resposta.json()).then((data:string[])=>{
            console.log(data)
        })
    }

    function pesquisar(e: FormEvent) {
        e.preventDefault()
        navigate(`/detalhes/${input}`)
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
                    <tr className={s.tr}>
                        <td data-label='Moeda:'>
                            <div className="name">
                                <Link to='/detalhes/bitcoin'><span>Bitcoin</span> | BTC</Link>
                            </div>
                        </td>

                        <td data-label='Valor de mercado:'>
                            Valor de mercado
                        </td>
                        
                        <td data-label='Preço:'>
                            Preço
                        </td>
                        
                        <td data-label='Volume:'>
                            Volume
                        </td>
                        
                        <td className={s.verde} data-label='Mudança 24h:'>
                            Mudança 24h
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className={s.btnMaisResultados}>Mais resultados</button>

        </section>
        
    )
}