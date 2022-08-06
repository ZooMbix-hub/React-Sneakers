import React, { useState, useContext } from 'react';
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';

import './CardStyle.scss';

const Card = ({ card, onPlus, onFavorite, favorited = false, loading = false }) => {
    const [isFavorite, setIsFavorite] = useState(favorited);
    const { isItemAdded } = useContext(AppContext);

    const onClickPlus = () => {
        onPlus({...card, parentId: card.id});
    }

    const onClickFavorite = () => {
        onFavorite({...card, parentId: card.id});
        setIsFavorite(prev => !prev)
    }

    return (
        <div className='card'>
            {
                loading ? 
                <ContentLoader 
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
                </ContentLoader>
                :
                <>
                    <div className='favorite' onClick={onClickFavorite}>
                        <img src={isFavorite ? process.env.PUBLIC_URL + "/img/favorite-active.svg" : process.env.PUBLIC_URL + "/img/favorite.png"} alt="" />
                    </div>
                    <img className='card-img' src={process.env.PUBLIC_URL + card.imageUrl} width={112} height={112}/>
                    <p className='card-name'>{card.name}</p>
                    <div className='cardInfo'>
                        <div className='card-price'>
                            <p>Цена:</p>
                            <b>{card.price} руб.</b>
                        </div>
                        {onPlus &&
                            (<button onClick={onClickPlus} className={isItemAdded(card.id)  ? 'plus-btn active-plus' : 'plus-btn'} >
                                {isItemAdded(card.id) ?
                                    <img src={process.env.PUBLIC_URL + '/img/plus-active.svg'} width={15} height={15}/>    
                                    :
                                    <svg className='plus-order-svg' width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6653 5.13122H7.20214V1.66821C7.20214 0.332846 5.13114 0.332846 5.13114 1.66821V5.13122H1.668C0.332935 5.13122 0.332935 7.20215 1.668 7.20215H5.13114V10.6652C5.13114 12.0005 7.20214 12.0005 7.20214 10.6652V7.20215H10.6653C12.0005 7.20215 12.0005 5.13122 10.6653 5.13122Z" fill="#D3D3D3"/>
                                    </svg>
                                }
                            </button>)
                        }
                    </div>
                </>
            }
      </div>
    )
}

export default Card