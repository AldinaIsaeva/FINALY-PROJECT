import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri";
import { addToCart } from '../REDUX/CartSlice';
import { removeFromWishlist, selectWishlistItems } from '../REDUX/WishlistSlice';
import { formatSom } from '../utils/currency';


function Wishlist() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className='wishlist-page'>
        <div className='wishlist-empty'>
          <h2>Избранное пусто</h2>
          <p>Добавьте товары из каталога</p>
          <Link to="/" className='wishlist-empty-btn'>
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='wishlist-page'>
      <div className='wishlist-list'>
        {wishlistItems.map((item) => (
          <div key={item.id} className='chocolates'>
            <button 
              className='delete-btn' 
              type="button" 
              onClick={() => handleRemoveFromWishlist(item.id)}
              aria-label="Удалить из избранного"
            >
              <RiDeleteBinLine />
            </button>
            <img src={item.img} alt={item.title} />
            <h6>{item.title}</h6>
            <p>{formatSom(item.price)}</p>
            <div>
              <button className='order' onClick={() => handleAddToCart(item)}>
                Добавить в корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist       