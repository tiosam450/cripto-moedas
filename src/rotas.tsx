import { createBrowserRouter } from "react-router-dom";
import Home from "./paginas/home";
import Detalhes from "./paginas/detalhes";
import NotFound from "./paginas/notfound/notfound";
import Layout from "./assets/layout";

const rotas = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path: '/',
                element:<Home/>
            },
            {
                path:'/detalhes/:cripto',
                element: <Detalhes/>
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ]
    }
])

export default rotas