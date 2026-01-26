import React from 'react'
import "./Homepage.css"
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div className='CAKE'>

      <div className='Menu_Cake'>
        <h2 className='name'>Меню</h2>
        <div className='bento'>
          <ul>
            {/* <h6 className='class'>Классические вкусы:</h6> */}

            <li>Шоколадный</li>
            <li>Ванильный</li>
            <li>Тирамису</li>
            <li>Павлова</li>
            <li>Медовик</li>
            <br />

            {/* <h6 className='class'>Особые и модные вкусы:</h6>  */}

            <li>Малиновая нежность</li>
            <li>Карамельный</li>
            <li>Муссовый</li>
            <li>Красный бархат</li>
            <br />

            {/* <h6 className='class'>Для особых случаев:</h6> */}
            <li>Бенто</li>
            <li>Торт для детей</li>
            <br />

            <li>Напитки</li>
            <li>Десерты</li>
          </ul>

          <Link className='price' to="/price">Указаны розничные цены</Link>

        </div>
      </div>


      <div className='Cake_Photo'>
        <div className='cheap'>
          <h2>Каталог</h2>
          <button className='chip'>Сначала дешевле</button>
        </div>

        <div className='dessert'>
          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/01/8f/57/018f574513eb6a33daa158463bbfe3f1.jpg" alt="cake" />
            <h6>Шоколадный</h6>
            <p>1200c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/30/48/e5/3048e542324a02c943a185942b1b9880.jpg" alt="cake2" />
            <h6>Ванильный</h6>
            <p>1000c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/8e/18/b5/8e18b5447bc341462d1bd9119e8f88ab.jpg" alt="cake2" />
            <h6>Тирамису</h6>
            <p>1300c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/4d/00/68/4d0068f06d2ea9dc83d3977696035aae.jpg" alt="cake2" />
            <h6>Павлова</h6>
            <p>1400c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/bd/41/68/bd4168b078996189f57430404e3c4d57.jpg" alt="cake2" />
            <h6>Медовик</h6>
            <p>1100c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://kusochek.com/images/tort/big/malina-na-rozovom-velyure.jpg" alt="cake2" />
            <h6>Малиновая нежность</h6>
            <p>1220c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/05/91/5c/05915c143651f14efae3b33965b92b32.jpg" alt="cake2" />
            <h6>Карамельный</h6>
            <p>1500c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/ec/4a/74/ec4a7407306a7ad58f163455bdfc4b7a.jpg" alt="cake2" />
            <h6>Муссовый</h6>
            <p>1700c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/51/3c/c8/513cc81c977bf2290471d2c937dac3d1.jpg" alt="cake2" />
            <h6>Красный бархат</h6>
            <p>1600c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/1d/04/02/1d0402b82e4d4e252cf0fc1f7846b62f.jpg" alt="cake2" />
            <h6>Бенто</h6>
            <p>350c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/16/66/19/1666198f52b4a6cf2faf944a2f047112.jpg" alt="cake2" />
            <h6>Бенто</h6>
            <p>350c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/d5/b4/e5/d5b4e52ad1855474d00dfeaa24f5bc2b.jpg" alt="cake2" />
            <h6>Бенто</h6>
            <p>350c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/54/a7/44/54a74406c8c7782b1d8dceee88aae70e.jpg" alt="cake2" />
            <h6>Торт для детей</h6>
            <p>1800c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/1200x/16/28/84/162884b2c3842bbf2382e36b0fe77ba5.jpg" alt="cake2" />
            <h6>Торт для детей</h6>
            <p>1800c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>

          <div className='chocolate'>
            <img src="https://i.pinimg.com/736x/52/9b/bf/529bbfa6179ce8d6e10d50532bb67117.jpg" alt="cake2" />
            <h6>Торт для детей </h6>
            <p>1800c</p>
            <div>
              <button className='order'>Заказать</button>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Homepage