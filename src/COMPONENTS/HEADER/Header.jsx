import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { IoReorderThreeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { BsCart4 } from "react-icons/bs";

function Header() {
  return (
    <div className='header_container'>

      <div className='shop_name'>
        <Link className='sweetlife' to="/">𝑺𝒘𝒆𝒆𝒕𝑳𝒊𝒇𝒆</Link>

      </div>

      <div className='catalog'>
        <IoReorderThreeOutline className='three-line' />
        <span className='span'>Каталог</span>
      </div>

      <div className='TheLinks'>
        <Link className='Links' to="/wholesale">Оптовые продажи</Link>
        <Link className='Links' to="/retail">Продажи в рознице</Link>
        <Link className='Links' to="/quality">Качество</Link>
        <Link className='Links' to="/contacts">Контакты</Link>
        <Link className='Links' to="/careers">Вакансии</Link>
        <Link className='Links' to="/reviews">Отзывы</Link>
      </div>

      <div className='account'>
        <Link to="/account">
          <CgProfile className='profile' />
        </Link>

        <Link to="/wishlist">
          <FiHeart className='profile' />
        </Link>

        <Link to="/cart">
          <BsCart4 className='profile' />
        </Link>
      </div>




      {/* <Link to="/service">Service</Link>    */}
    </div>
  )
}

export default Header
