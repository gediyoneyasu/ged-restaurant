import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Menu from './components/Menu/Menu'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Reservation from './components/Reservation/Reservation'
import Orders from './components/Orders/Orders'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Auth from './components/Auth/Auth'
import Profile from './components/Profile/Profile'
import Admin from './components/Admin/Admin'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-right" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  )
}

export default App
