import axios from 'axios';
import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import Info from '../Info';
import './DrawerStyle.scss';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const Drawer = ({ onClose, onRemoveToCart, items = [], opened })  => {

    const [isOrderComplited, setIsOrderComplited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orederId, setOrederId] = useState(null);
    const { cartItems, setCartItems, totalPrice } = useCart();

    const onClickOrder = async () => { 
        try {
            setIsLoading(true);
            const { data } = await axios.post("https://6223964d3af069a0f9a5e02e.mockapi.io/orders", {items: cartItems});
            setOrederId(data.id);
            setIsOrderComplited(true);
            setCartItems([]);

            for (let index = 0; index < cartItems.length; index++) {
                const element = cartItems[index];
                await axios.delete("https://6223964d3af069a0f9a5e02e.mockapi.io/cart/" + element.id); //
            }
        }
        catch(error) {
            alert("Don't have order!")
        }
        setIsLoading(false);
    }

    return (
        <div className={`overlay ${opened ? 'overlayVisible' : ''}`}>
            <div className='drawer'>
                <h2 className='drawer-h2'>Корзина
                    <svg className='close-drawer' onClick={onClose} width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#D3D3D3"/>
                    </svg>
                </h2>
                {
                    items.length > 0 ? 
                    (<>
                        <div className='cart-items-container'> 
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem">
                                    <img src={process.env.PUBLIC_URL + obj.imageUrl} alt="" className='cartItem-img'/>
                                    <div>
                                        <p>{obj.name}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <button onClick={() => onRemoveToCart(obj.id)}>
                                        <img src={process.env.PUBLIC_URL + "/img/close.svg"} alt="" wifth={11} height={11} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className=''>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{(totalPrice / 100 * 5).toFixed(2)} руб.</b>
                                </li>
                            </ul>
                            <button className='green-btn' disabled={isLoading} onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="" /></button>
                        </div> 
                    </>)
                    :
                    (<Info 
                        title={isOrderComplited ? "Заказ оформлен!" : "Корзина пустая" } 
                        description={isOrderComplited ? `Ваш заказ #${orederId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
                        image={isOrderComplited ? (process.env.PUBLIC_URL + "/img/order.svg") : (process.env.PUBLIC_URL + "/img/clear-box.svg")} 
                    />)

                }
            </div>
        </div>
    )
}

export default Drawer;