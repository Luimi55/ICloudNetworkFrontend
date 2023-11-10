import React from 'react'
import { Link } from 'react-router-dom';

const LinkApp = (
    {
        to, 
        // key, 
        onClick,
        children,
        color
    }) => {
  return (
    <Link to={to}  onClick={onClick} style={{ textDecoration: 'none', color:color }}>
        {children}
    </Link>
  )
}

export default LinkApp