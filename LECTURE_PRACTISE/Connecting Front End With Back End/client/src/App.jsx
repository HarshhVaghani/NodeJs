import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import AddStudents from './components/AddStudents'

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <AddStudents/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
