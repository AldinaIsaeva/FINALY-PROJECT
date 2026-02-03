import React from 'react'
import dessert from "../SVG/Dessert.svg"
import confectioner from "../SVG/Girl.svg"
import recipe from "../SVG/Good.svg"

function Quality() {
    return (
        <div className='quality'>
            <div className='bound'>
                <h6>Качество</h6>
                <p>Турбулентность, по данным астрономических наблюдений, сжимает субсветовой <br />
                    вихрь. Лазер отражает фронт. Волновая тень, вследствие квантового характера </p>
                <button>Связаться с менеджером</button>
            </div>

            <div className='product'>
                <h6>Документы</h6>
                <p>Турбулентность, по данным астрономических наблюдений,
                    сжимает субсветовой вихрь. Лазер отражает фронт.</p>

                <p>Наша продукция</p>


                <iframe
                    src="https://www.youtube.com/embed/ZjRQQFjf_VM"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />


            </div>

            <div className='control'>
                <h6>Контроле качества</h6>

                <div className='best'>
                    <div className='confectioner'>
                        <div className='image'>
                            <img className='photo' src={dessert} alt="" />
                        </div>
                        <p className='describe'>Лучшие ингредиенты</p>
                    </div>

                    <div className='confectioner'>
                        <div className='image'>
                            <img className='photo' src={confectioner} alt="" />
                        </div>
                        <p className='describe'>Опытные кондитеры</p>
                    </div>

                    <div className='confectioner'>
                        <div className='image'>
                            <img className='photo' src={recipe} alt="" />
                        </div>
                        <p className='describe'>Хорошая рецептура</p>
                    </div>

                </div>
            </div>


            <div className='manages'>
                <h6>Форма связи с менеджером</h6>

                <div className='inputs'>
                    <input type="text" placeholder='Ваше имя' />
                    <input type="email" placeholder='Email' />
                    <button>Отправить</button>
                </div>
            </div>

        </div>
    )
}

export default Quality
