import React from 'react'

const Footer = ({length}) => {
const year = new Date();

  return (
    <footer>
        {length} list {length ===1? "item": "items"} 
        <p>
        Copyright &copy; {year.getFullYear()}
        </p>
    </footer>
  )
}

export default Footer