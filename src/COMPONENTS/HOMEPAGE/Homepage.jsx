import React, { useEffect } from 'react'
import "./Homepage.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../REDUX/CartSlice'
import { toggleWishlist, selectIsInWishlist } from '../../REDUX/WishlistSlice'
import { fetchProducts, selectAllProducts, selectProductsLoading } from '../../REDUX/ProductsSlice'
import { FiHeart } from "react-icons/fi"
import { formatSom } from '../../utils/currency'

function Homepage() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.items)
  const products = useSelector(selectAllProducts)
  const loading = useSelector(selectProductsLoading)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = (product) => {
   
    const price = typeof product.price === 'number' ? product.price : Number(product.price)
    if (!isNaN(price) && price > 0) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: price,
        img: product.image || product.img
      }))
    }
  }

  const handleToggleWishlist = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.image || product.img
    }))
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const formatPrice = (price) => {
    const priceNum = typeof price === 'number' ? price : Number(price)
    if (!isNaN(priceNum) && priceNum > 0) {
      return formatSom(priceNum)
    }
    return '—'
  }

  const isValidPrice = (price) => {
    const priceNum = typeof price === 'number' ? price : Number(price)
    return !isNaN(priceNum) && priceNum > 0
  }

  return (
    <div className='CAKE'>

      <div className='Menu_Cake'>
        <h2 className='name'>Меню</h2>
        <div className='bento'>
          <ul>
            

            <li>Классический</li>
            <li>Шоколадный</li>
            <li>Тирамису</li>
            <li>Малиновая нежность</li>
            <li>Красный бархат</li>
            <br />

           

            <li>Орео чизкейк</li>
            <li>Трайфл с клубникой</li>
            <li>Панна котта с мандаринами</li>
            <li>Шоколадный фондан</li>
            <li>Эклеры</li>
            <br />

           
            <li>Фисташка-Малина</li>
            <li>Шоколад-Вишня</li>
            <li>Банан-Клубника</li>
            <li>Макарон с малиной</li>
            <li>Макарон с карамелью</li>
            <br />

            <li>Какао с маршмеллоу</li>
            <li>Латте с карамелью</li>
            <li>Фруктовый смузи</li>
            <li>Матча латте</li>
            <li>Коктейль</li>
          </ul>


        </div>
      </div>


      <div className='Cake_Photo'>
        <div className='cheap'>
          <h2>Каталог</h2>
          {/* <button className='chip'>Сначала дешевле</button> */}
        </div>

        <div className='dessert'>
          {loading && products.length === 0 ? (
            <div className='loading-state'>
              <p>Загрузка товаров...</p>
            </div>
          ) : products.length === 0 ? (
            <div className='empty-state'>
              <p>Товары не найдены</p>
            </div>
          ) : (
            products.map((product) => {
              const inWishlist = isInWishlist(product.id)
              const priceValid = isValidPrice(product.price)
              const productImage = product.image || product.img
              
              return (
                <div key={product.id} className='chocolate'>
                  <button
                    className='wishlist-btn'
                    type="button"
                    onClick={(e) => handleToggleWishlist(e, product)}
                    aria-label={inWishlist ? "Удалить из избранного" : "Добавить в избранное"}
                  >
                    <FiHeart className={inWishlist ? 'wishlist-icon active' : 'wishlist-icon'} />
                  </button>
                  <img src={productImage} alt={product.title} onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/230x200?text=No+Image'
                  }} />
                  <h6>{product.title}</h6>
                  <p className={!priceValid ? 'invalid-price' : ''}>{formatPrice(product.price)}</p>
                  <div>
                    <button 
                      className='order' 
                      onClick={() => handleAddToCart(product)}
                      disabled={!priceValid}
                      title={!priceValid ? 'Цена недоступна' : ''}
                    >
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

    </div>
  )
}

export default Homepage