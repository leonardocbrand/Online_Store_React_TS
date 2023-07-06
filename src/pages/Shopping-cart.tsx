import { useEffect, useState } from 'react';
import { ProductsData } from '../types';

// function cartListProduct() {
//   return (
//     <div>
//       <h1>{title}</h1>
//     </div>
//   )
// }

function ShoppingCart() {
  const [products, setProducts] = useState<ProductsData[]>([]);

  useEffect(() => {
    const itensCart = localStorage.getItem('cart');
    if (itensCart) {
      setProducts(JSON.parse(itensCart));
    }
  }, []);

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
          </div>
        ))
      )}
    </main>
  );
}

export default ShoppingCart;
