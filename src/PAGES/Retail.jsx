import React from 'react'
import { IoMdTime } from "react-icons/io";


function Retail() {
  return (
    <div className='retail'>
      <h6>Продажи в рознице</h6>

      <div className='sale'>

        <div className='sale1'>
          <img src="https://i.pinimg.com/1200x/72/61/a4/7261a4fa4137461fa1f097777d452960.jpg" alt="" />
          <div className='address'>
            <p>Турусбекова 109/1</p>
            <p> < IoMdTime /> Пн-Пт 09:00-22:00</p>
          </div>
          <button>Забронировать продукцию</button>
        </div>

        <div className='sale1'>
          <img src="https://i.pinimg.com/1200x/d2/de/31/d2de315d2af64ed1a4d91a068d436b42.jpg" alt="" />
          <div className='address'>
            <p>Турусбекова 109/1</p>
            <p> < IoMdTime /> Пн-Пт 09:00-22:00</p>
          </div>
          <button>Забронировать продукцию</button>
        </div>

        <div className='sale1'>
          <img src="https://i.pinimg.com/1200x/8e/e7/2d/8ee72d5f789f90c258e6359ebe4ca939.jpg" alt="" />
          <div className='address'>
            <p>Турусбекова 109/1</p>
            <p> < IoMdTime /> Пн-Пт 09:00-22:00</p>
          </div>
          <button>Забронировать продукцию</button>
        </div>

        <div className='sale1'>
          <img src="https://i.pinimg.com/736x/d1/a1/d6/d1a1d6eab11490e03525d315de8de7df.jpg" alt="" />
          <div className='address'>
            <p>Турусбекова 109/1</p>
            <p> < IoMdTime /> Пн-Пт 09:00-22:00</p>
          </div>
          <button>Забронировать продукцию</button>
        </div>

        <div className='sale1'>
          <img src="https://i.pinimg.com/736x/3d/c4/af/3dc4aff71726fe3165c505eb62a8cafb.jpg" alt="" />
          <div className='address'>
            <p>Турусбекова 109/1</p>
            <p> < IoMdTime /> Пн-Пт 09:00-22:00</p>
          </div>
          <button>Забронировать продукцию</button>
        </div>

      </div>
    </div>
  )
}

export default Retail
