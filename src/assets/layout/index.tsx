import { Outlet } from "react-router-dom";
import Header from "../../paginas/componentes/header";

export default function Layout(){
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}