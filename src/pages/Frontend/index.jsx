import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import NoPage from '../Misc/NoPage'
import CartPage from './CartPage'
import PrivacyPolicy from './PrivacyPolicy'
import ProductPage from './ProductPage'
import Collection from './Collection'
import CheckoutPage from './Checkout'
import CheckOutPrivateRoute from "../../components/CheckOutPrivateRoute"
import ThankYouPage from './ThanksYouPage'

const Frontend = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection/*' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="/collection/:category/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPrivateRoute Component={CheckoutPage} />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          <Route path='*' element={<NoPage />} />
        </Routes>
      <Footer />
    </>
  )
}

export default Frontend
