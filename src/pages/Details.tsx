import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductDetailsData, ProductsData } from '../types';
import Attributes from '../components/Attributes';
import Loading from '../components/Loading';
import ShoppingCartIcon from '../components/ShoppingCartIcon';

type PropsDetailsIten = {
  itensCar: ProductsData[]
};

function Details({ itensCar }: PropsDetailsIten) {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({} as ProductDetailsData);
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
  }, [idDetails]);

  return (
    <main>
      <ShoppingCartIcon itensCar={ itensCar } />
      {productInfo.attributes ? (
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
            {` Preço: ${productInfo.currency_id} ${productInfo.price}`}
          </p>
          <img
            data-testid="product-detail-image"
            src={ productInfo.thumbnail }
            alt=""
          />
          <Attributes productInfo={ productInfo } />
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Details;
