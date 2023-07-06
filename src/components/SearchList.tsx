import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProductsData } from '../types';

type SearchListProps = {
  products: ProductsData[];
};

function SearchList({ products }: SearchListProps) {
  const [productDetails, setProductDetails] = useState({});
  return (
    <section>
      {products.length === 0 ? (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      ) : (
        products.map((product: ProductsData) => (
          <div key={ product.id } data-testid="product">
            <Link
              data-testid="product-detail-link"
              to={ `/details/${product.id}` }
            >
              <div>
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt="" />
                <p>{`${product.currency_id} ${product.price}`}</p>
              </div>
            </Link>
          </div>
        ))
      )}
    </section>
  );
}

export default SearchList;
