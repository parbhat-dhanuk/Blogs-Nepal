import {BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from './pages/homepage/Homepage'
import Register from "./pages/authpage/Register"
import Login from "./pages/authpage/Login"
import Forgetpassword from "./pages/otp-page/Forgetpassword"
import Changepassword from "./pages/otp-page/Changepassword"
import Verifyotp from "./pages/otp-page/Verifyotp"
import Privacypolocy from "./pages/privacy policy/Privacypolocy"
import Termsandconditions from "./pages/privacy policy/Termsandconditions"
import Blogs from "./pages/blogspage/Blogs"
import Createblog from "./pages/blogspage/Createblog"
import Singleblog from "./pages/blogspage/Singleblog"
import Blogform from "./pages/blogspage/Blogform"
import Editblog from "./pages/blogspage/Editblog"
import Notfound from "./pages/blogspage/Notfound"
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
      <Route path='/privacy' element={<Privacypolocy/>}/>
      <Route path='/terms' element={<Termsandconditions/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/blog/create' element={<Createblog/>}/>
      <Route path='/blog/single/:id' element={<Singleblog/>}/>
      <Route path='/blog/edit' element={<Editblog/>}/>
      <Route path="*" element={<Notfound/>} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App