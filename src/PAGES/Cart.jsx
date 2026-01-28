import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, increaseQty, decreaseQty, clearCart, selectCartItems } from '../REDUX/CartSlice'
import { RiDeleteBinLine } from "react-icons/ri"
import './Cart.css'
import { formatSom } from '../utils/currency'

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const delivery = subtotal > 0 ? 200 : 0
  const total = subtotal + delivery

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleIncQty = (id) => {
    dispatch(increaseQty(id))
  }

  const handleDecQty = (id) => {
    dispatch(decreaseQty(id))
  }

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      dispatch(clearCart())
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className='cart-page'>
        <div className='cart-empty'>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
          <Link to="/" className='cart-empty-btn'>
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='cart-page'>
      <div className='cart-container'>
        <div className='cart-header'>
          <h2>Корзина</h2>
          <button className='clear-cart-btn' onClick={handleClearCart}>
            Очистить корзину
          </button>
        </div>

        <div className='cart-items'>
          {cartItems.map(item => (
            <div key={item.id} className='cart-item'>
              <div className='cart-item-image'>
                <img src={item.img} alt={item.title} />
              </div>
              
              <div className='cart-item-info'>
                <h6>{item.title}</h6>
                <p className='cart-item-price'>{formatSom(item.price)}</p>
                
                <div className='cart-item-controls'>
                  <div className='qty-controls'>
                    <button 
                      className='qty-btn' 
                      onClick={() => handleDecQty(item.id)}
                      disabled={item.qty <= 1}
                    >
                      −
                    </button>
                    <span className='qty-value'>{item.qty}</span>
                    <button 
                      className='qty-btn' 
                      onClick={() => handleIncQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className='cart-item-total'>
                    <span>{formatSom(item.price * item.qty)}</span>
                  </div>
                  
                  <button 
                    className='remove-item-btn' 
                    onClick={() => handleRemove(item.id)}
                    aria-label="Удалить из корзины"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='cart-summary'>
          <div className='summary-row'>
            <span>Товары:</span>
            <span>{formatSom(subtotal)}</span>
          </div>
          <div className='summary-row'>
            <span>Доставка:</span>
            <span>{delivery > 0 ? formatSom(delivery) : 'Бесплатно'}</span>
          </div>
          <div className='summary-row summary-total'>
            <span>Итого:</span>
            <span>{formatSom(total)}</span>
          </div>
          
          {cartItems.length > 0 ? (
            <Link to="/checkout" className='checkout-btn'>
              Оформить заказ
            </Link>
          ) : (
            <button className='checkout-btn checkout-btn-disabled' disabled title="Добавьте товар в корзину">
              Оформить заказ
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
