import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './SignUp'
import SignUpFail from './SignUpFail'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import CreateRental from './CreateRental'
import './color.css';

function App() {
  
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/SignUpFail' element={<SignUpFail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/CreateRental' element={<CreateRental />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
