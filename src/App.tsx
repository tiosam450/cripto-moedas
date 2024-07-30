import { RouterProvider } from "react-router-dom"
import rotas from "./rotas"

function App() {

  return (
    <>
     <RouterProvider router={rotas}/>
    </>
  )
}

export default App
