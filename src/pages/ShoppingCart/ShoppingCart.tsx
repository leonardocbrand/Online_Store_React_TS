import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,
  Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Add, Clear, Remove, Reply } from '@mui/icons-material';
import { ProductsData } from '../../types';

function ShoppingCart() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const itensCart = localStorage.getItem('cart');
    if (itensCart) {
      setProducts(JSON.parse(itensCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  const handleIncrease = (id: string) => {
    const product = products.find((e) => e.id === id);
    if (product && product.quantidade < product.available_quantity) {
      const newObject = { ...product, quantidade: product.quantidade + 1 };
      const newList = products.map((el) => (el.id !== product.id ? el : newObject));
      setProducts(newList);
    }
  };

  const handleDecrease = (id: string) => {
    const product = products.find((e) => e.id === id);
    if (product && product.quantidade > 1) {
      const newObject = { ...product, quantidade: product.quantidade - 1 };
      const newList = products.map((el) => (el.id !== product.id ? el : newObject));
      setProducts(newList);
    }
  };

  const handleDelete = (id: string) => {
    const newList = products.filter((product) => product.id !== id);
    setProducts(newList);
  };

  return (
    <Container sx={ { backgroundColor: '#F5F5F5', p: 0, minWidth: '100%' } }>
      <IconButton
        onClick={ () => navigate(-1) }
        sx={ { position: 'absolute', top: '10px' } }
      >
        <Reply sx={ { fill: '#2FC18C' } } />
        <Typography p={ 1 } sx={ { color: '#2FC18C' } }>Voltar</Typography>
      </IconButton>
      <Container
        sx={ { background: '#ffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' } }
      >
        {products.length === 0 ? (
          <Typography
            sx={ { width: '229px', height: '68px' } }
            variant="h1"
            fontSize={ 30 }
            fontWeight={ 600 }
            color="#31C28D"
            data-testid="shopping-cart-empty-message"
          >
            SEU CARRINHO ESTÁ VAZIO
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" mt={ 4 }>
            <Typography
              variant="h2"
              fontWeight={ 700 }
              fontSize={ 26 }
              sx={ { fontSize: { xs: '20px', sm: '26px' } } }
              mb={ 3 }
              textAlign="center"
            >
              Carrinho de Compras

            </Typography>
            <Divider />
            <Stack>
              {products.map((element) => (
                <>
                  <Box
                    key={ element.id }
                    display="flex"
                    alignItems="Center"
                    p={ 2 }
                    justifyContent="space-between"
                  >
                    <IconButton
                      onClick={ () => handleDelete(element.id) }
                      data-testid="remove-product"
                    >
                      <Clear />
                    </IconButton>
                    <img src={ element.thumbnail } alt={ element.title } />
                    <Typography
                      data-testid="shopping-cart-product-name"
                      sx={ { fontSize: { xs: 13, sm: 15 } } }

                    >
                      {element.title}

                    </Typography>
                    <Typography
                      sx={ { fontSize: { xs: 13, sm: 15 } } }
                      fontWeight={ 600 }
                      ml={ 1 }
                      mr={ 1 }
                    >
                      {`R$${element.price}`}

                    </Typography>
                    <IconButton
                      onClick={ () => handleDecrease(element.id) }
                      data-testid="product-decrease-quantity"
                      sx={ { p: 0 } }
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      data-testid="shopping-cart-product-quantity"
                      fontSize={ 20 }
                      color="#B0B3BB"
                      sx={ { fontSize: { xs: 13, sm: 16 } } }
                    >
                      {element.quantidade}

                    </Typography>
                    <IconButton
                      onClick={ () => handleIncrease(element.id) }
                      data-testid="product-increase-quantity"
                      sx={ { p: 0 } }
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <Divider />
                </>
              ))}
              <Button
                variant="contained"
                color="success"
                data-testid="checkout-products"
                sx={ { m: 2 } }
                onClick={ () => navigate('/checkout') }
              >
                Finalizar compra

              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </Container>
  );
}

export default ShoppingCart;
