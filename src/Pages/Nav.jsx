import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserContext from './UserContext'
import { useContext } from 'react'

const Nav = ({hidden}) => {
    const {items} = useContext(UserContext);
  return (
    <>
    <div className={hidden ? 'nav hidden' : 'nav'}>
        <Link to='/' className='logo'>
            TechIn
        </Link>
        <Link to='/cart' className='cart'>
            Cart({items.length})
        </Link>
    </div>
    <Outlet/>
    </>
  )
}

export default Nav