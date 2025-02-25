import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../output.css'
import React from 'react'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <NavBar />
        <HomePage />
      </div>
    },
    {
      path:'/pastes',
      element:
      <div>
        <NavBar />
        <Paste />
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <NavBar />
        <ViewPaste />
      </div>
    }
  ]
)

function App() {
  return (
    <div className='w-full h-screen bg-gray-100'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
