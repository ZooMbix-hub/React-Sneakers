import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Favorites from './pages/favorites/Favorites';
import Orders from './pages/orders/Orders';

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
/*     fetch("https://6223964d3af069a0f9a5e02e.mockapi.io/items")
      .then(res => {
        return res.json();
      })
      .then(json => {
        setItems(json);
      }
    ); */
    
    async function fetchData() {
      try {
        const cartResponse = await axios.get("https://6223964d3af069a0f9a5e02e.mockapi.io/cart");
        const favoriteResponse = await axios.get("https://6223964d3af069a0f9a5e02e.mockapi.io/favorites");
        const itemsResponse = await axios.get("https://6223964d3af069a0f9a5e02e.mockapi.io/items");
        
        setLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data); 
      }
      catch(error) {
        alert('Error request!')
      }
    }

   fetchData();

  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => item.parentId === obj.id);
      if (findItem) {
        setCartItems(prev => prev.filter(item => item.parentId !== obj.id));
        await axios.delete(`https://6223964d3af069a0f9a5e02e.mockapi.io/cart/${findItem.id}`);
      }
      else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post("https://6223964d3af069a0f9a5e02e.mockapi.io/cart", obj);
        setCartItems(prev => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
      console.log(findItem)
    }
    catch (error) {
      alert('Error axios');
    }
  };

  const onRemoveToCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id != id));
    axios.delete(`https://6223964d3af069a0f9a5e02e.mockapi.io/cart/${id}`);
  }

  const onFavoriteToCart = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id == obj.id)) {
        axios.delete(`https://6223964d3af069a0f9a5e02e.mockapi.io/favorites/${obj.id}`);
  /*       setFavorites((prev) => prev.filter(item => item.id != obj.id));
   */    } 
      else {
        const { data } = await axios.post("https://6223964d3af069a0f9a5e02e.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    }
    catch (error) {
      alert("Не удалось добавить в закладки");
    }
  }

  const onChangeSearchInput = (event) => { 
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.parentId == id);
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToCart, onFavoriteToCart }}>
      <div className="wrapper ">
        <div>
          <Drawer 
            items={cartItems} onClose={() => setCartOpened(false)} 
            onRemoveToCart={onRemoveToCart} 
            opened={cartOpened}
          />
        </div>

        <Routes>
          <Route path="/React-Sneakers" element={<Header onClickCart={() => setCartOpened(true)}/>}>
            <Route index element={
              <Home
                items={items}
                cartItems={cartItems} 
                searchValue={searchValue} 
                onChangeSearchInput={onChangeSearchInput} 
                setSearchValue={setSearchValue} 
                onAddToCart={onAddToCart}
                favorites={favorites}
                onFavoriteToCart={onFavoriteToCart}
                isLoading={isLoading}
              />
            }/>         
            <Route path="favorites" element={<Favorites onFavoriteToCart={onFavoriteToCart} />}/>
            <Route path="orders" element={<Orders />}/>
          </Route>
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
