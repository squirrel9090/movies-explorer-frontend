import './Navbar.css'
import { useState } from 'react'

const Navbar = () => {
  const [showItems, setShowItems] = useState(false)

  const handleToggleMenu = () => setShowItems(!showItems)

  return (
    <button
      className='navbar__button'
      type='button'
      onClick={handleToggleMenu}
    ></button>
  )
}
export default Navbar
