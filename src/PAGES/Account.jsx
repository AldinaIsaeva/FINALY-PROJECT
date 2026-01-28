import React from 'react'
import { IoLogoGoogle } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";

function Account() {
  return (
    <div className='account-page'>
      <div className='registration'>
      <h6>Авторизация</h6>
      <p>Кварк, как следует из совокупности экспериментальных
        наблюдений, квантуем. Многочисленные расчеты
        предсказывают</p>

      <button className='google'><IoLogoGoogle />
        Продолжить с Google</button>

      <button className='Faphone'><FaPhoneSquareAlt />
        По номеру телефона</button>

      <p>Нажимая на кнопки "Продолжить", вы соглашаетесь с
        политикой конфиденциальности</p>
      </div>
    </div>
  )
}

export default Account
