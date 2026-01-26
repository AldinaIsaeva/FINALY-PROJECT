import React from 'react'
import { CiHeart } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";


function Wishlist() {
  return (
    <div>
      <div className='chocolates'>
        <div className='icons'>
          <CiHeart />
          <RiDeleteBinLine />
        </div>
        <img src="https://i.pinimg.com/736x/05/91/5c/05915c143651f14efae3b33965b92b32.jpg" alt="cake2" />
        <h6>Карамельный</h6>
        <p>1500c</p>
        <div>
          <button className='order'>Заказать</button>
        </div>
      </div>
    </div>
  )
}

export default Wishlist       