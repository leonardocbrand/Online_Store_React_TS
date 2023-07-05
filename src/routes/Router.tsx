import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShoppingCart from '../pages/Shopping-cart';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
    </Routes>
  );
}

export default Router;
