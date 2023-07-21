import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box,
  Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Add, Clear, Remove, Reply } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { ProductsData } from '../../types';

type ShoppingCartProps = {
  itensCar: ProductsData[];
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function ShoppingCart({ itensCar, setItensCar }: ShoppingCartProps) {
  // const [products, setProducts] = useState<ProductsData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const itensCart = localStorage.getItem('cart');
    if (itensCart) {
      setItensCar(JSON.parse(itensCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itensCar));
  }, [itensCar]);

  const handleIncrease = (id: string) => {
    const product = itensCar.find((e) => e.id === id);
    if (product
      && product.quantidade < product.available_quantity
      && product.quantidade < 9) {
      const newObject = { ...product, quantidade: product.quantidade + 1 };
      const newList = itensCar.map((el) => (el.id !== product.id ? el : newObject));
      setItensCar(newList);
    }
    if (product?.quantidade === product?.available_quantity) {
      Swal.fire(
        'Número máximo de produtos',
        `Só há ${product?.available_quantity} produto(s) disponível no momento`,
        'info',
      );
    }
  };

  const handleDecrease = (id: string) => {
    const product = itensCar.find((e) => e.id === id);
    if (product && product.quantidade > 1) {
      const newObject = { ...product, quantidade: product.quantidade - 1 };
      const newList = itensCar.map((el) => (el.id !== product.id ? el : newObject));
      setItensCar(newList);
    }
    if (product && product.quantidade === 1) {
      const newList = itensCar.filter((element) => element.id !== id);
      setItensCar(newList);
    }
  };

  const handleDelete = (id: string) => {
    const newList = itensCar.filter((product) => product.id !== id);
    setItensCar(newList);
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
        {itensCar.length === 0 ? (
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
              {itensCar.map((element) => (
                <>
                  <Box
                    key={ element.id + element.thumbnail }
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
                      sx={ {
                        fontSize: { xs: 13, sm: 15 },
                        textAlign: 'justify',
                        width: { xs: 94, md: 480 },
                      } }

                    >
                      {element.title}

                    </Typography>
                    <Box
                      ml={ 1 }
                      mr={ 1 }
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        onClick={ () => handleDecrease(element.id) }
                        data-testid="product-decrease-quantity"
                        sx={ { p: 0 } }
                      >
                        <Remove />
                      </IconButton>
                      <span
                        style={ {
                          width: '20px',
                          height: '20px',
                          borderRadius: '100px',
                          backgroundColor: '#B0B3BB',
                        } }
                      >
                        <Typography
                          data-testid="shopping-cart-product-quantity"
                          fontSize={ 20 }
                          color="#ffff"
                          sx={ {
                            fontSize: 14,
                            position: 'absolute',
                            transform: 'translate(67%, -5%)' } }
                        >
                          {element.quantidade}
                        </Typography>
                      </span>
                      <IconButton
                        onClick={ () => handleIncrease(element.id) }
                        data-testid="product-increase-quantity"
                        sx={ { p: 0 } }
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography
                      sx={ { fontSize: { xs: 13, sm: 15 } } }
                      fontWeight={ 600 }
                      ml={ 1 }
                      mr={ 1 }
                      width={ 60 }
                    >
                      {`R$${element.price}`}

                    </Typography>
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
