import {BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from './pages/homepage/Homepage'
import Register from "./pages/authpage/Register"
import Login from "./pages/authpage/Login"
import Forgetpassword from "./pages/otp-page/Forgetpassword"
import Changepassword from "./pages/otp-page/Changepassword"
import Verifyotp from "./pages/otp-page/Verifyotp"
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgetpassword' element={<Forgetpassword/>}/>
      <Route path='/verifyotp' element={<Verifyotp/>}/>
      <Route path='/changepassword' element={<Changepassword/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App