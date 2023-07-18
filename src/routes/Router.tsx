import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart } from '../pages/ShoppingCart';
import { ProductsData } from '../types';
import { Checkout } from '../pages/Checkout';
import { Details } from '../pages/Details';
import { HomePage } from '../pages/HomePage';

function Router() {
  const cartLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [itensCar, setItensCar] = useState<ProductsData[]>(cartLocalStorage);

  return (
    <Routes>
      <Route
        path="/"
        element={ <HomePage
          itensCar={ itensCar }
          setItensCar={ setItensCar }
        /> }
      />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
      <Route path="/details/:idDetails" element={ <Details itensCar={ itensCar } /> } />
      <Route
        path="/checkout"
        element={ <Checkout
          itensCar={ itensCar }
          setItensCar={ setItensCar }
        /> }
      />
    </Routes>
  );
}

export default Router;
