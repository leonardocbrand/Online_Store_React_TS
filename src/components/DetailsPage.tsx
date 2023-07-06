import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductsData } from '../types';

function DetailsPage() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({} as ProductsData);
  const { idDetails } = useParams();
  function handleClick() {
    navigate('/shopping-cart');
  }
  useEffect(() => {
    async function getProduct() {
      if (idDetails) {
        const data = await getProductById(idDetails);
        setProductInfo(data);
      }
    }
    getProduct();
  }, []);
  return (
    <div>
      <button
        data-testid="shopping-cart-button"
        onClick={ handleClick }
      >
        Carrinho
      </button>
      <p data-testid="product-detail-name">{productInfo.title}</p>
      <p
        data-testid="product-detail-price"
      >
        {` preço ${productInfo.currency_id} ${productInfo.price}`}

      </p>
      <img
        data-testid="product-detail-image"
        src={ productInfo.thumbnail }
        alt=""
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        aliquid commodi libero consequatur corrupti eum. Nihil aut dolor
        consectetur in. Illo veniam repellendus ea et dolore perferendis
        recusandae nulla tempore.
      </p>
    </div>
  );
}

export default DetailsPage;
