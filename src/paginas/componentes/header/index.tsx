import { Link } from "react-router-dom"
import logo from '../../../assets/img/logo.webp'
import s from '../../../paginas/home/home.module.css'

export default function Header(){
    return(
        <section className={s.container}>
        <Link to='/' className={s.logo}><img src={logo} alt="Logo" /></Link>
        </section>
    )
}