import React, { useState, useEffect, useRef, useCallback } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { IoReorderThreeOutline, IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { BsCart4 } from "react-icons/bs";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(v => !v);
  };


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, closeMenu]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target) && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen, closeMenu]);

 
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {isMenuOpen && <div className='menu_overlay' onClick={() => setIsMenuOpen(false)} />}
      <div className='header_container' ref={headerRef}>
        <div className='header_top'>
          <div className='shop_name'>
            <Link className='sweetlife' to="/" onClick={() => setIsMenuOpen(false)}>𝑺𝒘𝒆𝒆𝒕𝑳𝒊𝒇𝒆</Link>
          </div>

          <button 
            className='catalog'
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <IoClose className='three-line' />
            ) : (
              <IoReorderThreeOutline className='three-line' />
            )}
            <span className='span'>Каталог</span>
          </button>

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
        </div>

        <nav 
          id="mobile-nav"
          className={`TheLinks ${isMenuOpen ? 'TheLinks--open' : ''}`}
        >
          <Link className='Links' to="/wholesale" onClick={() => setIsMenuOpen(false)}>Оптовые продажи</Link>
          <Link className='Links' to="/retail" onClick={() => setIsMenuOpen(false)}>Продажи в рознице</Link>
          <Link className='Links' to="/quality" onClick={() => setIsMenuOpen(false)}>Качество</Link>
          <Link className='Links' to="/contacts" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
          <Link className='Links' to="/careers" onClick={() => setIsMenuOpen(false)}>Вакансии</Link>
          <Link className='Links' to="/reviews" onClick={() => setIsMenuOpen(false)}>Отзывы</Link>
          
          <div className='mobile_account'>
            <Link to="/account" onClick={() => setIsMenuOpen(false)}>
              <CgProfile className='profile' />
            </Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
              <FiHeart className='profile' />
            </Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              <BsCart4 className='profile' />
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
