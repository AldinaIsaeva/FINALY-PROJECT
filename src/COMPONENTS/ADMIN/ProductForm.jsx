import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct, updateProduct, fetchProducts } from '../../REDUX/ProductsSlice'
import { FiX } from 'react-icons/fi'
import './ProductForm.css'

function ProductForm({ product, onClose }) {
  const dispatch = useDispatch()
  const isEditing = !!product

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    price: '',
    discount: '',
    category: '',
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        image: product.image || '',
        price: isNaN(product.price) ? '' : product.price.toString(),
        discount: (product.discount || 0).toString(),
        category: product.category || '',
      })
    }
  }, [product])

  const validate = () => {
    const newErrors = {}


    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно'
    }

    
    if (!formData.image.trim()) {
      newErrors.image = 'URL изображения обязателен'
    } else {
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = 'Некорректный URL'
      }
    }

    
    const priceNum = parseFloat(formData.price)
    if (!formData.price.trim()) {
      newErrors.price = 'Цена обязательна'
    } else if (isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = 'Цена должна быть положительным числом'
    }

  
    const discountNum = parseFloat(formData.discount) || 0
    if (formData.discount.trim() && (isNaN(discountNum) || discountNum < 0 || discountNum > 100)) {
      newErrors.discount = 'Скидка должна быть от 0 до 100'
    }

  
    if (!formData.category.trim()) {
      newErrors.category = 'Категория обязательна'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setSubmitting(true)

    try {
      const productData = {
        title: formData.title.trim(),
        image: formData.image.trim(),
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        category: formData.category.trim(),
      }

      if (isEditing) {
        await dispatch(updateProduct({ id: product.id, productData })).unwrap()
      } else {
        await dispatch(createProduct(productData)).unwrap()
      }

     
      dispatch(fetchProducts())
      onClose()
    } catch (error) {
      setErrors({ submit: error || 'Ошибка при сохранении' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='form-overlay' onClick={onClose}>
      <div className='form-container' onClick={(e) => e.stopPropagation()}>
        <div className='form-header'>
          <h2>{isEditing ? 'Редактировать товар' : 'Создать товар'}</h2>
          <button className='btn-close' onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='product-form'>
          {errors.submit && (
            <div className='error-message'>{errors.submit}</div>
          )}

          <div className='form-group'>
            <label htmlFor='title'>Название *</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className='error-text'>{errors.title}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='image'>URL изображения *</label>
            <input
              type='url'
              id='image'
              name='image'
              value={formData.image}
              onChange={handleChange}
              className={errors.image ? 'error' : ''}
            />
            {errors.image && <span className='error-text'>{errors.image}</span>}
            {formData.image && !errors.image && (
              <img src={formData.image} alt='Preview' className='image-preview' onError={(e) => e.target.style.display = 'none'} />
            )}
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='price'>Цена *</label>
              <input
                type='number'
                id='price'
                name='price'
                value={formData.price}
                onChange={handleChange}
                min='0'
                step='0.01'
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className='error-text'>{errors.price}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='discount'>Скидка (%)</label>
              <input
                type='number'
                id='discount'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                min='0'
                max='100'
                step='1'
                className={errors.discount ? 'error' : ''}
              />
              {errors.discount && <span className='error-text'>{errors.discount}</span>}
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='category'>Категория *</label>
            <input
              type='text'
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            />
            {errors.category && <span className='error-text'>{errors.category}</span>}
          </div>

          <div className='form-actions'>
            <button
              type='button'
              className='btn-cancel'
              onClick={onClose}
              disabled={submitting}
            >
              Отмена
            </button>
            <button
              type='submit'
              className='btn-submit'
              disabled={submitting || Object.keys(errors).some(key => errors[key])}
            >
              {submitting ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm

