import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex gap-4 justify-center m-2'>
      <NavLink
      to='/'
      >
        Home
      </NavLink>
      <NavLink
      to='/pastes'
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default NavBar
