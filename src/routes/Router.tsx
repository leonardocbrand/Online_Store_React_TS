import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart } from '../pages/ShoppingCart';
import { ProductsData } from '../types';
import { Checkout } from '../pages/Checkout';
import { Details } from '../pages/Details';
import { HomePage } from '../pages/HomePage';

function Router() {
  const cartLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [itensCart, setItensCart] = useState<ProductsData[]>(cartLocalStorage);

  return (
    <Routes>
      <Route
        path="/"
        element={ <HomePage
          itensCar={ itensCart }
          setItensCar={ setItensCart }
        /> }
      />
      <Route
        path="/shopping-cart"
        element={ <ShoppingCart itensCar={ itensCart } setItensCar={ setItensCart } /> }
      />
      <Route
        path="details/:idDetails"
        element={ <Details itensCar={ itensCart } setItensCar={ setItensCart } /> }
      />
      <Route
        path="/checkout"
        element={ <Checkout
          itensCar={ itensCart }
          setItensCar={ setItensCart }
        /> }
      />
    </Routes>
  );
}

export default Router;
