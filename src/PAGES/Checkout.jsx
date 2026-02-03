import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectCartItems, clearCart } from '../REDUX/CartSlice';
import { createOrder } from '../REDUX/OrdersSlice';
import { formatSom } from '../utils/currency';


const generateOrderId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = String(now.getTime()).slice(-4);
  return `SL-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
};

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = subtotal > 0 ? 200 : 0;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    deliveryType: 'delivery',
    address: '',
    comment: '',
    payment: 'cash',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, type: 'success', message: '' });
  const [lastOrderDraft, setLastOrderDraft] = useState(null);
  const modalTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (modalTimerRef.current) {
        clearTimeout(modalTimerRef.current);
      }
    };
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h2>Корзина пуста</h2>
          <p>Добавьте товары в корзину перед оформлением заказа.</p>
          <Link to="/" className="cart-empty-btn">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Имя обязательно';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Телефон обязателен';
    }

    if (form.deliveryType === 'delivery' && !form.address.trim()) {
      nextErrors.address = 'Адрес обязателен для доставки';
    }

    if (!form.payment) {
      nextErrors.payment = 'Выберите способ оплаты';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendOrderToWhatsApp = (order) => {
    const PHONE = "996559250515";
    
    const lines = [];
    lines.push('🛒 Заказ с сайта');
    lines.push('');
    
    if (order.id) {
      lines.push(`Номер заказа: ${order.id}`);
    }
    lines.push(`Имя: ${order.name}`);
    lines.push(`Телефон: ${order.phone}`);
    
    if (order.deliveryType === 'delivery') {
      lines.push('Доставка: доставка');
      if (order.address) {
        lines.push(`Адрес: ${order.address}`);
      }
    } else {
      lines.push('Доставка: самовывоз');
    }
    
    if (order.payment) {
      const paymentLabel = order.payment === 'card' ? 'карта' : 'наличные';
      lines.push(`Оплата: ${paymentLabel}`);
    }
    
    if (order.comment) {
      lines.push(`Комментарий: ${order.comment}`);
    }
    
    lines.push('');
    lines.push('Товары:');
    
    order.items.forEach((item, index) => {
      const title = item.title || '';
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      const lineTotal = qty * price;
      lines.push(`${index + 1}) ${title} x${qty} — ${Math.round(lineTotal)} сом`);
    });
    
    lines.push('');
    lines.push(`Итого: ${Math.round(order.total)} сом`);
    
    const message = lines.join('\n');
    const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    
    window.location.href = waUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const now = new Date();
    const safeItems = cartItems.map((item) => {
      const priceNum = Number(item.price);
      return {
        ...item,
        price: Number.isNaN(priceNum) ? 0 : priceNum,
        qty: Number(item.qty) || 0,
      };
    });

    const safeSubtotal = safeItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const safeDelivery = subtotal > 0 ? 200 : 0;
    const safeTotal = safeSubtotal + safeDelivery;

    const order = {
      id: generateOrderId(),
      createdAt: now.toISOString(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      deliveryType: form.deliveryType,
      address: form.deliveryType === 'delivery' ? form.address.trim() : '',
      comment: form.comment.trim(),
      payment: form.payment,
      items: safeItems,
      subtotal: safeSubtotal,
      deliveryFee: safeDelivery,
      total: safeTotal,
    };

    setLastOrderDraft(order);

    try {
      // Save order and clear cart before redirecting
      dispatch(createOrder(order));
      dispatch(clearCart());
      
      // Show success modal briefly
      setModal({
        open: true,
        type: 'success',
        message: 'Заказ принят ✅',
      });

      // Redirect to WhatsApp after a brief delay to show modal
      modalTimerRef.current = setTimeout(() => {
        sendOrderToWhatsApp(order);
      }, 500);
    } catch (err) {
      setModal({
        open: true,
        type: 'error',
        message: err && err.message
          ? err.message
          : 'Не удалось отправить заказ. Попробуйте ещё раз.',
      });
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    if (!lastOrderDraft) return;
    setSubmitting(true);
    try {
      // Save order and clear cart before redirecting
      dispatch(createOrder(lastOrderDraft));
      dispatch(clearCart());
      
      // Show success modal briefly
      setModal({
        open: true,
        type: 'success',
        message: 'Заказ принят ✅',
      });

      // Redirect to WhatsApp after a brief delay to show modal
      modalTimerRef.current = setTimeout(() => {
        sendOrderToWhatsApp(lastOrderDraft);
      }, 500);
    } catch (err) {
      setModal({
        open: true,
        type: 'error',
        message: err && err.message
          ? err.message
          : 'Не удалось отправить заказ. Попробуйте ещё раз.',
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-main">
          <h2>Оформление заказа</h2>
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="checkout-field">
              <label htmlFor="name">Имя *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="checkout-field">
              <label htmlFor="phone">Телефон *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="checkout-field">
              <span className="field-label">Тип доставки *</span>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={form.deliveryType === 'delivery'}
                    onChange={handleChange}
                  />
                  Доставка
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={form.deliveryType === 'pickup'}
                    onChange={handleChange}
                  />
                  Самовывоз
                </label>
              </div>
            </div>

            {form.deliveryType === 'delivery' && (
              <div className="checkout-field">
                <label htmlFor="address">Адрес *</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>
            )}

            <div className="checkout-field">
              <label htmlFor="comment">Комментарий к заказу</label>
              <textarea
                id="comment"
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="checkout-field">
              <span className="field-label">Оплата *</span>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={form.payment === 'cash'}
                    onChange={handleChange}
                  />
                  Наличные
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === 'card'}
                    onChange={handleChange}
                  />
                  Карта
                </label>
              </div>
              {errors.payment && <span className="field-error">{errors.payment}</span>}
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Отправить заказ'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Ваш заказ</h3>
          <ul className="checkout-items">
            {cartItems.map(item => (
              <li key={item.id} className="checkout-item-row">
                <div className="checkout-item-title">
                  {item.title}
                </div>
                <div className="checkout-item-meta">
                  <span>{item.qty} x {formatSom(item.price)}</span>
                  <span className="checkout-item-total">
                    {formatSom(item.price * item.qty)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-totals">
            <div className="checkout-total-row">
              <span>Товары</span>
              <span>{formatSom(subtotal)}</span>
            </div>
            <div className="checkout-total-row">
              <span>Доставка</span>
              <span>{deliveryFee > 0 ? formatSom(deliveryFee) : 'Бесплатно'}</span>
            </div>
            <div className="checkout-total-row checkout-total-main">
              <span>Итого</span>
              <span>{formatSom(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {modal.open && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <div className="order-modal-icon">
              {modal.type === 'success' ? '✅' : '⚠️'}
            </div>
            <h3>{modal.type === 'success' ? 'Заказ принят' : 'Ошибка'}</h3>
            <p>{modal.message}</p>
            {modal.type === 'error' && (
              <button
                type="button"
                className="checkout-submit-btn"
                onClick={handleRetry}
                disabled={submitting}
              >
                {submitting ? 'Повторная отправка...' : 'Повторить отправку'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

