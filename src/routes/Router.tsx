import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShoppingCart from '../pages/Shopping-cart';
import Details from '../pages/Details';

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
      <Route path="/details/:idDetails" element={ <Details /> } />
    </Routes>
  );
}

export default Router;
