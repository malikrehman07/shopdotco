import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllProducts from './AllProducts'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'

const Products = () => {
  return (
    <Routes>
        <Route path='/all' element={<AllProducts/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/edit/:id' element={<EditProduct/>} />
      </Routes>
  )
}

export default Products
