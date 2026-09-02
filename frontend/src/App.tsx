import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Main/Home'
import { LoginPage } from './pages/LoginPage/LoginPage'

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
