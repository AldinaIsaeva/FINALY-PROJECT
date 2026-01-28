import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectLastOrder, clearLastOrder } from '../REDUX/OrdersSlice';
import { formatSom } from '../utils/currency';

function OrderSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastOrder = useSelector(selectLastOrder);

  useEffect(() => {
    if (!lastOrder) {
      const timer = setTimeout(() => navigate('/'), 1500);
      return () => clearTimeout(timer);
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) {
    return (
      <div className="order-success-page">
        <div className="order-success-card">
          <h2>Заказ не найден</h2>
          <p>Перенаправляем на главную...</p>
          <Link to="/" className="order-success-link">На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <h2>Спасибо за заказ!</h2>
        <p>Ваш заказ успешно отправлен в WhatsApp.</p>
        <p><strong>Номер заказа:</strong> {lastOrder.id}</p>
        <p><strong>Сумма:</strong> {formatSom(lastOrder.total)}</p>
        <Link to="/" className="order-success-link" onClick={() => dispatch(clearLastOrder())}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;

