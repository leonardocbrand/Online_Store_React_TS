import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ProductsData } from '../types';
import ItemCard from './ItemCard';

type SearchListProps = {
  products: ProductsData[];
  itensCar: ProductsData[];
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function SearchList({ products, itensCar, setItensCar }: SearchListProps) {
  const handleClickAddCar = (product: ProductsData) => {
    const verifyProduct = itensCar.find((element) => element.id === product.id);
    if (!verifyProduct) {
      const newProduct = { ...product, quantidade: 1 };
      setItensCar((prevState) => [...prevState, newProduct]);
    } else {
      verifyProduct.quantidade += 1;
      const newlistCar = itensCar.filter((el) => el.id !== verifyProduct.id);
      setItensCar([...newlistCar, verifyProduct]);
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itensCar));
  }, [itensCar]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexGrow={ 1 }
      alignItems="center"
    >
      {
        products.length === 0
          ? (
            <Box
              display="flex"
              flexDirection="column"
              sx={ { width: { xs: 200, md: 350 } } }
            >
              <Typography color="#31C28D" variant="h5" fontWeight={ 700 }>
                VOCÊ AINDA NÃO REALIZOU UMA BUSCA
              </Typography>

              <Typography
                color="#94979D"
                variant="subtitle1"
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </Typography>
            </Box>
          ) : (
            <Grid
              container
              rowSpacing={ { xs: 4, sm: 5 } }
              columnSpacing={ { xs: 1, sm: 2, md: 3 } }
              p={ 8 }
              width="100%"
              maxHeight="90vh"
              overflow="auto"
            >
              {products.map((product: ProductsData) => (
                <Grid
                  key={ product.id }
                  item
                  xs={ 12 }
                  sm={ 6 }
                  md={ 3 }
                  data-testid="product"
                >
                  <ItemCard
                    product={ product }
                    onClick={ () => handleClickAddCar(product) }
                  />
                </Grid>
              ))}
            </Grid>
          )
      }
    </Box>
  );
}

export default SearchList;
