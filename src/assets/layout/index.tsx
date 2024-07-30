import { Outlet } from "react-router-dom";
import Header from "../../paginas/componentes/header";
import Footer from "../../paginas/componentes/footer";

export default function Layout(){
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}