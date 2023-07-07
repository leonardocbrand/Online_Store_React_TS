import { useEffect, useState } from 'react';
import { ProductsData } from '../types';

function ShoppingCartIcon() {
  const quantidadeCarrinho = JSON.parse(localStorage.getItem('quantidadeCarrinho') || '');
  const [amountCart, setAmountCart] = useState(0);

  useEffect(() => {
    const getAmountCart = () => {
      const cartLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
      const quantityCart = cartLocalStorage
        .reduce((acumulador: number, produto:ProductsData) => {
          return acumulador + produto.quantidade;
        }, 0);
      setAmountCart(quantityCart);
      localStorage.setItem('quantidadeCarrinho', JSON.stringify(quantityCart));
    };
    getAmountCart();
  });

  return (
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
        alt="cart icon"
        width="50px"
      />
      <p data-testid="shopping-cart-size">{amountCart}</p>
    </div>
  );
}

export default ShoppingCartIcon;
