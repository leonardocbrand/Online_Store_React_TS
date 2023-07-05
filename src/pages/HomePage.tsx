import Categories from '../components/Categories';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const submit = () => {
    navigate('shopping-cart');
  };
  return (
    <main>
      <input type="text" name="" id="" />
      <button
        onClick={ submit }
        data-testid="shopping-cart-button"
      >
        Carrinho
      </button>
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
      <Categories />
    </main>
  );
}

export default HomePage;
