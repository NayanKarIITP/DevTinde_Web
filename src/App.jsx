import React from 'react'
import Body from './Body'
import Login from './login'
import Profile from './profile'
import Connections from './connections'
import { BrowserRouter,Routes,Route } from 'react-router'

function App() {
  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/connections' element={<Connections/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App