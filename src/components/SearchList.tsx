import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsData } from '../types';

type SearchListProps = {
  products: ProductsData[];
  itensCar: ProductsData[];
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function SearchList({ products, itensCar, setItensCar }: SearchListProps) {
  const handleClickAddCar = (product: ProductsData) => {
    const verifyProduct = itensCar.find((element) => element.id === product.id);
    if (!verifyProduct) {
      const newProduct = { ...product, quantidade: 1 };
      setItensCar((prevState) => [...prevState, newProduct]);
    } else {
      verifyProduct.quantidade += 1;
      const newlistCar = itensCar.filter((el) => el.id !== verifyProduct.id);
      setItensCar([...newlistCar, verifyProduct]);
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itensCar));
  }, [itensCar]);

  return (
    <section>
      {
        products.length === 0
          ? (
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
                  <p>{ product.title }</p>
                  <img src={ product.thumbnail } alt="" />
                  <p>{ `${product.currency_id} ${product.price}` }</p>
                  {product.shipping.free_shipping ? (
                    <p data-testid="free-shipping">Frete grátis!</p>
                  ) : (
                    null
                  )}
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => handleClickAddCar(product) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          )
      }
    </section>
  );
}

export default SearchList;
