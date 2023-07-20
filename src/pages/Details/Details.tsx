import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, IconButton,
  Paper, Stack, Typography } from '@mui/material';
import { Reply } from '@mui/icons-material';
import { getProductById } from '../../services/api';
import { ProductDetailsData, ProductsData } from '../../types';
import Attributes from '../../components/Attributes';
import Loading from '../../components/Loading';
import Rating from '../../components/Rating';
import Header from '../../components/Header';
import { StyledDetailsImg } from '../../components/styles/StyledDetailsImg';

type PropsDetailsIten = {
  itensCar: ProductsData[]
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function Details({ itensCar, setItensCar }: PropsDetailsIten) {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({} as ProductDetailsData);
  const { idDetails } = useParams();

  function handleClickAddToCart(product: ProductDetailsData) {
    const productsList = JSON.parse(localStorage.getItem('cart') || '[]');
    const verifyProduct = productsList
      .find((element: { id: string; }) => element.id === product.id);
    if (!verifyProduct) {
      const newProduct = { ...product, quantidade: 1 };
      const newProductsList = [...productsList, newProduct];
      localStorage.setItem('cart', JSON.stringify(newProductsList));
      setItensCar(newProductsList);
    } else {
      verifyProduct.quantidade += 1;
      const newlistCar = productsList
        .filter((el: { id: any; }) => el.id !== verifyProduct.id);
      const newListCart2 = [...newlistCar, verifyProduct];
      localStorage.setItem('cart', JSON.stringify(newListCart2));
      setItensCar(newListCart2);
    }
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
    <Container
      sx={ {
        backgroundColor: '#F5F5F5',
        p: 0,
        minWidth: '100%',
        minHeight: '100vh' } }
    >
      <Header itensCar={ itensCar } setLoading={ () => {} } setProducts={ () => {} } />
      <IconButton
        onClick={ () => navigate(-1) }
        sx={ { position: 'absolute', top: '80px', left: '10px' } }
      >
        <Reply sx={ { fill: '#2FC18C' } } />
        <Typography p={ 1 } sx={ { color: '#2FC18C' } }>Voltar</Typography>
      </IconButton>
      {productInfo.attributes ? (
        <Stack component="section">
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            sx={ { flexDirection: { xs: 'column', md: 'row' } } }
          >
            <Paper
              elevation={ 3 }
              sx={ {
                backgroundColor: '#FFF',
                p: 1,
                mt: 17,
                width: { xs: 370, md: 488 },
                height: { xs: 515, sm: 515 },
                display: 'flex',
                mb: { xs: 4, md: 0 },
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center' } }
            >
              <Typography
                variant="h1"
                mb={ 2 }
                fontSize={ 20 }
                fontWeight={ 700 }
                textAlign="center"
                data-testid="product-detail-name"
              >
                {productInfo.title}
              </Typography>
              <StyledDetailsImg
                data-testid="product-detail-image"
                src={ productInfo.pictures[0].url }
                alt={ productInfo.title }
              />
            </Paper>
            <Paper
              elevation={ 3 }
              sx={ { backgroundColor: '#FFF', width: { xs: 370, md: 488 }, p: 4 } }
            >
              <Attributes productInfo={ productInfo } />
              {productInfo.shipping.free_shipping
            && (
              <Typography
                variant="subtitle1"
                color="#31C28D"
                data-testid="free-shipping"
              >
                Frete grátis!
              </Typography>)}
              <Box display="flex" alignItems="center" justifyContent="space-evenly">
                <Typography
                  data-testid="product-detail-price"
                  variant="body1"
                  fontWeight={ 700 }
                >
                  {` R$ ${productInfo.price}`}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  data-testid="product-detail-add-to-cart"
                  onClick={ () => handleClickAddToCart(productInfo) }
                >
                  Adicionar ao carrinho
                </Button>
              </Box>
            </Paper>
          </Box>
          <Rating />
        </Stack>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Details;
