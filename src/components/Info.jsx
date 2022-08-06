import React, { useContext } from 'react'
import { AppContext } from '../App'

const Info = ({  title, description }) => {

    const { setCartOpened } = useContext(AppContext);

    return (
        <div className='cart-empty'>
            {/* <img src={process.env.PUBLIC_URL + image} alt='box'/> */}
            <h2>{title}</h2>
            <p>{description}</p>
            <button className='green-btn' onClick={() => setCartOpened(false)} >
                <img src={process.env.PUBLIC_URL + "/img/arrow.svg"} alt="arrow" />
                Вернуться назад
            </button>
        </div>
    )
}

export default Info