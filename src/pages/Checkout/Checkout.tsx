import { useEffect, useState } from 'react';
import { ProductsData } from '../../types';
import CheckoutForm from '../../components/CheckoutForm';

type CheckoutProps = {
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function Checkout({ setItensCar }: CheckoutProps) {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    const itensCart = localStorage.getItem('cart');
    if (itensCart) {
      setProducts(JSON.parse(itensCart));

      const total = products
        .reduce((acc, curr) => (Number(curr.price) * Number(curr.quantidade)) + acc, 0);

      setTotalPrice(total);
    }
  }, [totalPrice]);

  return (
    <main>
      <section>
        <h2>Revise seus Produtos</h2>
        {products.map((product) => (
          <ul key={ product.id }>
            <img src={ product.thumbnail } alt={ product.title } />
            <li>{product.title}</li>
            <li>{`Quantidade: ${product.quantidade}`}</li>
            <li>
              {`Preço: R$${Number(product.price) * Number(product.quantidade)}`}
            </li>
          </ul>
        ))}
        <h4>{`Total: R$ ${totalPrice}`}</h4>
      </section>
      <CheckoutForm setItensCar={ setItensCar } />
    </main>
  );
}

export default Checkout;
