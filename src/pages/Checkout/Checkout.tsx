import { useEffect, useState } from 'react';
import { Box, Container, Divider, IconButton, Paper, Typography } from '@mui/material';
import { Reply } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ProductsData } from '../../types';
import CheckoutForm from '../../components/CheckoutForm';
import Header from '../../components/Header';

type CheckoutProps = {
  itensCar: ProductsData[];
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function Checkout({ itensCar, setItensCar }: CheckoutProps) {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const navigate = useNavigate();

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
    <Container
      sx={ {
        backgroundColor: '#F5F5F5',
        p: 0,
        minWidth: '100%',
        minHeight: '100vh' } }
    >
      <Header itensCar={ itensCar } setProducts={ setProducts } setLoading={ () => {} } />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={ { flexDirection: { xs: 'column', md: 'row' }, p: { xs: 3, md: 5 } } }
      >
        <IconButton
          onClick={ () => navigate(-1) }
          sx={ { position: 'absolute', top: '85px', left: '10px' } }
        >
          <Reply sx={ { fill: '#2FC18C' } } />
          <Typography p={ 1 } sx={ { color: '#2FC18C' } }>Voltar</Typography>
        </IconButton>
        <Paper
          elevation={ 3 }
          sx={ { backgroundColor: '#FFF', mt: 17, p: 2, width: { xs: 370, md: 458 } } }
        >
          <Typography
            variant="h1"
            fontSize={ 20 }
            fontWeight={ 700 }
            textAlign="center"
            p={ 1 }
          >
            Revise seus Produtos

          </Typography>
          <Divider />
          {products.map((product, index) => (
            <>
              <Box
                key={ product.id + product.thumbnail + index + product.title }
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={ 2 }
              >
                <Typography
                  fontSize={ 14 }
                  fontWeight={ 600 }
                >
                  {`${product.quantidade}`}
                </Typography>
                <img src={ product.thumbnail } alt={ product.title } />
                <Typography
                  fontSize={ 15 }
                  fontWeight={ 600 }
                  sx={ {
                    textAlign: 'left',
                    width: { xs: 120, md: 140 },
                  } }
                >
                  {product.title}
                </Typography>
                <Typography fontSize={ 15 } fontWeight={ 600 }>
                  {`R$${Number(product.price) * Number(product.quantidade)}`}
                </Typography>
              </Box>
              <Divider />
            </>
          ))}
          <Typography
            fontSize={ 20 }
            fontWeight={ 700 }
            textAlign="center"
            mt={ 2 }
          >
            {`Total: R$ ${totalPrice?.toFixed(2)}`}

          </Typography>
        </Paper>
        <CheckoutForm setItensCar={ setItensCar } />
      </Box>
    </Container>
  );
}

export default Checkout;
