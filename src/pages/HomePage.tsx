import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsData } from '../types';
import Categories from '../components/Categories';
import SearchList from '../components/SearchList';
import Loading from '../components/Loading';
import ShoppingCartIcon from '../components/shopping-cart-icon';

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('shopping-cart');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const getData = async () => {
      const data = await getProductsFromCategoryAndQuery('', searchInput);
      setLoading(false);
      setProducts(data.results);
    };

    getData();
  };
  return (
    <main>
      <ShoppingCartIcon products={ products } />
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="search"
          data-testid="query-input"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
        <button data-testid="query-button" type="submit">Buscar</button>
      </form>
      <button
        onClick={ handleClick }
        data-testid="shopping-cart-button"
      >
        Carrinho
      </button>
      <Categories setProducts={ setProducts } />
      {loading ? <Loading /> : <SearchList products={ products } /> }
    </main>
  );
}

export default HomePage;
