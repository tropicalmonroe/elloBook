import React from 'react'
import { Routes, Route} from 'react-router-dom'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Editform from './pages/Editform'
import Newbook from './pages/Newbook'

function App() {

  return (
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path={`/edit/:id`} element={<Editform/>}/>
        <Route path='/new' element={<Newbook/>}/>
      </Routes>
    
  )
}

export default App
