import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Main/Home'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ProdutoListPage } from './pages/Entities/Produto/ProdutoListPage'
import { MovimentacaoListPage } from './pages/Entities/Movimentacao/MovimentacaoListPage'
import { UsuarioListPage } from './pages/Entities/Usuario/UsuarioListPage'
import { MovimentacaoDetailsPage } from './pages/Entities/Movimentacao/MovimentacaoDetailsPage'
import { ProdutoDetailsPage } from './pages/Entities/Produto/ProdutoDetailsPage'
import { UsuarioDetailsPage } from './pages/Entities/Usuario/UsuarioDetailsPage'
import { ProdutoCreatePage } from './pages/Entities/Produto/ProdutoCreatePage'
import { MovimentacaoCreatePage } from './pages/Entities/Movimentacao/MovimentacaoCreatePage'
import { UsuarioCreatePage } from './pages/Entities/Usuario/UsuarioCreatePage'
import { AdminProtectedRoute, ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/produtos' element={<ProtectedRoute element={<ProdutoListPage />} />} />
          <Route path='/produtos/novo' element={<ProtectedRoute element={<ProdutoCreatePage />} />} />
          <Route path='/produtos/:id' element={<ProtectedRoute element={<ProdutoDetailsPage />} />} />
          <Route path='/produtos/:id/editar' element={<ProtectedRoute element={<ProdutoDetailsPage edit />} />} />
          <Route path='/movimentacoes' element={<ProtectedRoute element={<MovimentacaoListPage />} />} />
          <Route path='/movimentacoes/novo' element={<ProtectedRoute element={<MovimentacaoCreatePage />} />} />
          <Route path='/movimentacoes/:id' element={<ProtectedRoute element={<MovimentacaoDetailsPage />} />} />
          <Route path='/movimentacoes/:id/editar' element={<ProtectedRoute element={<MovimentacaoDetailsPage edit />} />} />
          <Route path='/usuarios' element={<AdminProtectedRoute element={<UsuarioListPage />} />} />
          <Route path='/usuarios/novo' element={<AdminProtectedRoute element={<UsuarioCreatePage />} />} />
          <Route path='/usuarios/:id' element={<AdminProtectedRoute element={<UsuarioDetailsPage />} />} />
          <Route path='/usuarios/:id/editar' element={<AdminProtectedRoute element={<UsuarioDetailsPage edit />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
