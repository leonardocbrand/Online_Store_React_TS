import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShoppingCart from '../pages/Shopping-cart';
import Details from '../pages/Details';
import Checkout from '../pages/Checkout';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
      <Route path="/details/:idDetails" element={ <Details /> } />
      <Route path="/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default Router;
