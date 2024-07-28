import 'bootstrap/dist/css/bootstrap.min.css'
import './color.css'
import Chat from './Chat'
import ChatList from './ChatList';
import CreateRental from './CreateRental'
import Home from './Home'
import Login from './Login'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import RentalDetail from './RentalDetail'
import SignUp from './Signup'
import SignUpFail from './SignUpFail'
import UserDetail from './UserDetail'

function App() {
  
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path="/chat/:chatid" element={<Chat />}></Route>
        <Route path='/CreateRental' element={<CreateRental />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path="/rentals/:id" element={<RentalDetail />} />
        <Route path='/SignUpFail' element={<SignUpFail />}></Route>
        <Route path='/user/:id' element={<UserDetail />}></Route>
        <Route path="/user/chats" element={<ChatList />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
