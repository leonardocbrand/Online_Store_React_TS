import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ProductsData } from '../types';
import Categories from '../components/Categories';
import SearchList from '../components/SearchList';
import Loading from '../components/Loading';
import Header from '../components/Header';

type PropsHomePage = {
  itensCar: ProductsData[];
  setItensCar: React.Dispatch<React.SetStateAction<ProductsData[]>>
};

function HomePage({ itensCar, setItensCar }: PropsHomePage) {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header
        itensCar={ itensCar }
        setLoading={ setLoading }
        setProducts={ setProducts }
      />
      <Container component="main" sx={ { display: 'flex', pt: 9, minHeight: '100vh' } }>
        <Categories setProducts={ setProducts } />
        <Box
          display="flex"
          justifyContent="center"
          sx={ { backgroundColor: '#F5F5F5', width: '100%' } }
        >
          {loading ? <Loading /> : <SearchList
            products={ products }
            itensCar={ itensCar }
            setItensCar={ setItensCar }
          /> }
        </Box>

      </Container>
    </>
  );
}

export default HomePage;
