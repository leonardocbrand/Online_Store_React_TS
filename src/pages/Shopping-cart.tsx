import { useEffect, useState } from 'react';
import { ProductsData } from '../types';

function ShoppingCart() {
  const [products, setProducts] = useState<ProductsData[]>([]);

  useEffect(() => {
    const itensCart = localStorage.getItem('cart');
    if (itensCart) {
      setProducts(JSON.parse(itensCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  function handleClickAumenta(id: string) {
    const product = products.find((e) => e.id === id);
    if (product) {
      const newObject = { ...product, quantidade: product.quantidade + 1 };
      const newList = products.map((el) => (el.id !== product.id ? el : newObject));
      setProducts(newList);
    }
  }

  function handleClickDiminui(id: string) {
    const product = products.find((e) => e.id === id);
    if (product && product.quantidade > 1) {
      const newObject = { ...product, quantidade: product.quantidade - 1 };
      const newList = products.map((el) => (el.id !== product.id ? el : newObject));
      setProducts(newList);
    }
  }

  function handleClickExcluir(id: string) {
    const newList = products.filter((el) => el.id !== id);
    setProducts(newList);
  }

  return (
    <main>
      {products.length === 0 ? (
        <h2
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </h2>
      ) : (
        products.map((element) => (
          <div key={ element.id }>
            <p data-testid="shopping-cart-product-name">{element.title}</p>
            <img src={ element.thumbnail } alt={ element.title } />
            <p>{element.price}</p>
            <p data-testid="shopping-cart-product-quantity">{element.quantidade}</p>
            <button
              onClick={ () => handleClickAumenta(element.id) }
              data-testid="product-increase-quantity"
            >
              +

            </button>
            <button
              onClick={ () => handleClickDiminui(element.id) }
              data-testid="product-decrease-quantity"
            >
              -

            </button>
            <button
              onClick={ () => handleClickExcluir(element.id) }
              data-testid="remove-product"
            >
              X

            </button>
          </div>
        ))
      )}
    </main>
  );
}

export default ShoppingCart;
