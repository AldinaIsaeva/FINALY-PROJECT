import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  fetchProducts, 
  deleteProduct, 
  setSearch, 
  setCategoryFilter, 
  setSort,
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
  selectCategories
} from '../REDUX/ProductsSlice'
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi'
import ProductForm from '../COMPONENTS/ADMIN/ProductForm'
import './AdminProductsPage.css'
import { formatSom } from '../utils/currency'

function AdminProductsPage() {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const categories = useSelector(selectCategories)
  const filters = useSelector(state => state.products.filters)

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value))
  }

  const handleCategoryFilter = (e) => {
    dispatch(setCategoryFilter(e.target.value))
  }

  const handleSort = (sortBy) => {
    const sortOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc'
    dispatch(setSort({ sortBy, sortOrder }))
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap()
      setDeleteConfirm(null)
    } catch (err) {
      
      setDeleteConfirm(null)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  const formatPrice = (price) => {
    if (typeof price === 'number' && !isNaN(price)) {
      return formatSom(price)
    }
    return '—'
  }

  const formatDiscount = (discount) => {
    if (typeof discount === 'number' && !isNaN(discount) && discount > 0) {
      return `${discount}%`
    }
    return '—'
  }

  if (showForm) {
    return (
      <ProductForm 
        product={editingProduct}
        onClose={handleFormClose}
      />
    )
  }

  return (
    <div className='admin-products-page'>
      <div className='admin-header'>
        <h1>Управление товарами</h1>
        <button 
          className='btn-create'
          onClick={() => setShowForm(true)}
        >
          <FiPlus /> Создать товар
        </button>
      </div>

      {error && (
        <div className='error-message'>
          {error}
        </div>
      )}

      <div className='admin-filters'>
        <div className='search-box'>
          <FiSearch className='search-icon' />
          <input
            type='text'
            placeholder='Поиск по названию...'
            value={filters.search}
            onChange={handleSearch}
            className='search-input'
          />
        </div>

        <select
          value={filters.category}
          onChange={handleCategoryFilter}
          className='category-filter'
        >
          <option value=''>Все категории</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          className={`sort-btn ${filters.sortBy === 'price' ? 'active' : ''}`}
          onClick={() => handleSort('price')}
        >
          Цена {filters.sortBy === 'price' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {loading && products.length === 0 ? (
        <div className='loading-state'>
          <div className='spinner'></div>
          <p>Загрузка товаров...</p>
        </div>
      ) : products.length === 0 ? (
        <div className='empty-state'>
          <p>Товары не найдены</p>
          <button 
            className='btn-create'
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> Создать первый товар
          </button>
        </div>
      ) : (
        <div className='products-table-container'>
          <table className='products-table'>
            <thead>
              <tr>
                <th>Изображение</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Скидка</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className='product-thumb'
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
                      }}
                    />
                  </td>
                  <td className='product-title'>{product.title}</td>
                  <td>{product.category || '—'}</td>
                  <td className={isNaN(product.price) ? 'invalid-price' : ''}>
                    {formatPrice(product.price)}
                  </td>
                  <td>{formatDiscount(product.discount)}</td>
                  <td>
                    <div className='action-buttons'>
                      <button
                        className='btn-edit'
                        onClick={() => handleEdit(product)}
                        title='Редактировать'
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className='btn-delete'
                        onClick={() => setDeleteConfirm(product.id)}
                        title='Удалить'
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className='modal-overlay' onClick={() => setDeleteConfirm(null)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h3>Подтвердите удаление</h3>
            <p>Вы уверены, что хотите удалить этот товар?</p>
            <div className='modal-actions'>
              <button
                className='btn-cancel'
                onClick={() => setDeleteConfirm(null)}
              >
                Отмена
              </button>
              <button
                className='btn-confirm-delete'
                onClick={() => handleDelete(deleteConfirm)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProductsPage

