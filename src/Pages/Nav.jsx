import React, { useCallback, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserContext from './UserContext'
import { useContext, useState } from 'react'

const Nav = ({hidden}) => {
    const { items, quantitySum } = useContext(UserContext);
  return (
    <>
    <div className={hidden ? 'nav hidden' : 'nav'}>
        <Link to='/'>
            TechIn
        </Link>
        <Link to='/cart'>
            Cart({quantitySum})
        </Link>
    </div>
    <Outlet/>
    </>
  )
}

export default Nav