import { useState } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsData } from '../types';

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<ProductsData[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getData = async () => {
      const data = await getProductsFromCategoryAndQuery('', searchInput);
      setProducts(data.results);
    };

    getData();
  };

  return (
    <main>
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
      <section>
        {
          products.length === 0
            ? (
              <h2 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h2>
            ) : (
              products.map((product) => (
                <div key={ product.id } data-testid="product">
                  <p>{product.title}</p>
                  <img src={ product.thumbnail } alt="" />
                  <p>{`${product.currency_id} ${product.price}`}</p>
                </div>
              ))
            )
        }
      </section>
    </main>
  );
}

export default HomePage;
