import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import './Account.css';

function Account() {
  const { user, login, register, logout } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/user-not-found': 'Пользователь не найден',
      'auth/wrong-password': 'Неверный пароль',
      'auth/email-already-in-use': 'Email уже используется',
      'auth/weak-password': 'Пароль слишком слабый (минимум 6 символов)',
      'auth/invalid-email': 'Неверный формат email',
      'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
      'auth/network-request-failed': 'Ошибка сети. Проверьте подключение',
    };
    return errorMessages[errorCode] || 'Произошла ошибка. Попробуйте ещё раз';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError('Ошибка при выходе');
    }
  };

  if (user) {
    return (
      <div className="account-page">
        <div className="account-page__card">
          <h2 className="account-page__profile-title">Профиль</h2>
          <div className="account-page__profile">
            <div className="account-page__profile-info">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>UID:</strong> {user.uid}</p>
              {error && <div className="account-page__error">{error}</div>}
            </div>
            <button 
              onClick={handleLogout}
              className="account-page__logout"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-page__card">
        <h2 className="account-page__title">Авторизация</h2>
        
        <div className="account-page__tabs">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`account-page__tab ${mode === 'login' ? 'account-page__tab--active' : ''}`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`account-page__tab ${mode === 'register' ? 'account-page__tab--active' : ''}`}
          >
            Регистрация
          </button>
        </div>

        <form className="account-page__form" onSubmit={handleSubmit}>
          <div className="account-page__field">
            <label htmlFor="email" className="account-page__label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="account-page__input"
              placeholder="example@email.com"
            />
          </div>

          <div className="account-page__field">
            <label htmlFor="password" className="account-page__label">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="account-page__input"
              placeholder="Минимум 6 символов"
            />
          </div>

          {error && (
            <div className="account-page__error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`account-page__button ${loading ? 'account-page__button--loading' : ''}`}
          >
            {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="account-page__footer">
          Нажимая на кнопку "{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}", вы соглашаетесь с
          политикой конфиденциальности
        </p>
      </div>
    </div>
  );
}

export default Account;
