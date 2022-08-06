import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ContentLoader from "react-content-loader";

import { AppContext } from '../../App';
import Card from '../../components/card/Card';
import Info from '../../components/Info';

const Orders = () => {

    const { onAddToCart, onFavoriteToCart } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("https://6223964d3af069a0f9a5e02e.mockapi.io/orders");
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false) 
            }
            catch(error) {
                alert("Error have query");
            }
        })();

    }, []);

    return (
        <div className='content'>
            <div className='content-title'>
                <h1>Мои заказы</h1>
            </div>

            <div className='container-card'>
            {
                isLoading ? 
                (<ContentLoader 
                    speed={2}
                    width={180}
                    height={250}
                    viewBox="0 0 160 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="155" /> 
                    <rect x="100" y="86" rx="0" ry="0" width="0" height="1" /> 
                    <rect x="0" y="164" rx="10" ry="10" width="150" height="15" /> 
                    <rect x="0" y="187" rx="10" ry="10" width="100" height="15" /> 
                    <rect x="0" y="232" rx="10" ry="10" width="80" height="25" /> 
                    <rect x="124" y="230" rx="15" ry="15" width="32" height="32" />
                </ContentLoader>)
                :
                (orders.length > 0 ?
                (orders.map((card, index ) => (
                    <Card 
                        key={index} 
                        card={card}
                        onPlus={(obj) => onAddToCart(obj)} 
                        onFavorite={(obj) => onFavoriteToCart(obj)}
                        loading={isLoading}
                    />
                )))
                :
                (<Info 
                    title="У вас нет заказов"
                    description="Оформите хотя бы один заказ."
                    image="/img/clear-oreders.svg"
                />))
            }
            </div>
        </div>
    )
}

export default Orders