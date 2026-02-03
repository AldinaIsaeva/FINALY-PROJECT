import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer_container'>

      <div className='bakery'>
        <p>© Кондитерские изделия «<span className='sweet'>𝑺𝒘𝒆𝒆𝒕𝑳𝒊𝒇𝒆</span>»</p>
      </div>

      <div className='confidentiality'>
        <Link className='politics' to="/politic">Политика конфиденциальности</Link> 
        <p className='phone_number'>+996 550 25-05-15</p>
      </div>

    </div>
  )
}

export default Footer
