import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar'

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Detector from './pages/Detector';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes> {/* The Switch decides which component to show based on the current URL.*/}
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/detector' element={<Detector/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
