import {BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from './pages/homepage/Homepage'
import Register from "./pages/authpage/Register"
import Login from "./pages/authpage/Login"
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App