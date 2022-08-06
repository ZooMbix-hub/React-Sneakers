import React, { useContext } from 'react';
import { AppContext } from '../../App';
import Card from '../../components/card/Card';
import Info from '../../components/Info';
import './FavoritesStyle.scss';

const Favorites = ({ onFavoriteToCart }) => {

    const { favorites } = useContext(AppContext);

    return (
        <div className='content'>
            <div className='content-title'>
                <h1>Мои закладки</h1>
            </div>

            <div className='container-card'>
            {
                favorites.length > 0 ?
                (favorites.map((card, index ) => (
                    <Card 
                        key={index} 
                        card={card} 
                        favorited={true} 
                        onFavorite={onFavoriteToCart}
                    />
                )))
                :
                (<Info 
                    title="Закладок нет :("
                    description="Вы ничего не добавляли в закладки"
                    image="/img/clear-favorites.svg"
                />)
            }
            </div>
        </div>
    )
}

export default Favorites