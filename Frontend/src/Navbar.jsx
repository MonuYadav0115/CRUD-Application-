import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='nav'>
      <NavLink to="/" className="link">
        Display
      </NavLink>

      <NavLink to="/add" className="link">
        Add Data
      </NavLink>

      <NavLink to="/search" className="link">
        Search
      </NavLink>
    </nav>
  )
}

export default Nav
