import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsData } from '../../types';

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

  function handleIncrease(id: string) {
    const product = products.find((e) => e.id === id);
    if (product && product.quantidade < product.available_quantity) {
      const newObject = { ...product, quantidade: product.quantidade + 1 };
      const newList = products.map((el) => (el.id !== product.id ? el : newObject));
      setProducts(newList);
    }
  }

  function handleDecrease(id: string) {
    const product = products.find((e) => e.id === id);
    if (product && product.quantidade > 1) {
      const newObject = { ...product, quantidade: product.quantidade - 1 };
      const newList = products.map((el) => (el.id !== product.id ? el : newObject));
      setProducts(newList);
    }
  }

  function handleDelete(id: string) {
    const newList = products.filter((product) => product.id !== id);
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
              onClick={ () => handleIncrease(element.id) }
              data-testid="product-increase-quantity"
            >
              +

            </button>
            <button
              onClick={ () => handleDecrease(element.id) }
              data-testid="product-decrease-quantity"
            >
              -

            </button>
            <button
              onClick={ () => handleDelete(element.id) }
              data-testid="remove-product"
            >
              X

            </button>
          </div>
        ))
      )}
      <Link to="/checkout">
        <button data-testid="checkout-products">Finalizar compra</button>
      </Link>
    </main>
  );
}

export default ShoppingCart;
