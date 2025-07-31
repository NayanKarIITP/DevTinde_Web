import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter,Routes,Route } from 'react-router'

function App() {
  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/about' element={<div>About page</div>}/>
        <Route path='/profile' element={<div>Profile page</div>}/>
        <Route path='/login' element={<div>Login page</div>}/>
        <Route path='/register' element={<div>Register page</div>}/>
      </Routes>
    </BrowserRouter>
    <Navbar/>
    </>
  )
}

export default App