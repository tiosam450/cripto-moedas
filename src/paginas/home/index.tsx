import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { FormEvent } from "react";
import s from './home.module.css'

export default function Home() {
    const [input, setInput] = useState<string | number>()

    function pesquisar(e: FormEvent) {
        e.preventDefault()

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
                    <tr>
                        <td data-label='Moeda'>
                            <div className="name">
                                <Link to='/detalhes/bitcoin'><span>Bitcoin</span> | BTC</Link>
                            </div>
                        </td>

                        <td data-label='Valor de mercado'>
                            Valor de mercado
                        </td>
                        
                        <td data-label='Preço'>
                            Preço
                        </td>
                        
                        <td data-label='Volume'>
                            Volume
                        </td>
                        
                        <td data-label='Mudança 24h'>
                            Mudança 24h
                        </td>
                    </tr>
                </tbody>
            </table>

        </section>
        
    )
}