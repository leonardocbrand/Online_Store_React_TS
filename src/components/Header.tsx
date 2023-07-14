import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar,
  IconButton, InputBase, Paper, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ProductsData } from '../types';
import ShoppingCartIcon from './ShoppingCartIcon';
import { getProductsFromCategoryAndQuery } from '../services/api';
import logo from '../images/logo.svg';
import { StyledImg } from './styles/StyledImg';

type HeaderProps = {
  itensCar: ProductsData[];
  setProducts: React.Dispatch<React.SetStateAction<ProductsData[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ itensCar, setProducts, setLoading }: HeaderProps) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClick = () => {
    navigate('shopping-cart');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const getData = async () => {
      const data = await getProductsFromCategoryAndQuery('', searchInput);
      setLoading(false);
      setProducts(data.results);
    };

    getData();
  };

  return (
    <AppBar sx={ { p: { xs: '10px 0 0 0' } } }>
      <Toolbar sx={ { justifyContent: 'space-between' } }>
        <Paper
          component="form"
          onSubmit={ handleSubmit }
          sx={ {
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: 120, sm: 230 },
            height: { xs: 30, sm: 35 },
          } }
        >
          <InputBase
            sx={ {
              '& input::placeholder': { fontSize: { xs: '12px', sm: '14px' } },
              p: 1,
            } }
            placeholder="Buscar produto"
            autoComplete="off"
            inputProps={ { 'aria-label': 'search product' } }
            type="text"
            name="search"
            data-testid="query-input"
            value={ searchInput }
            onChange={ (e) => setSearchInput(e.target.value) }
          />
          {isMatch ? (
            null
          ) : (
            <IconButton
              type="submit"
              sx={ { p: '10px' } }
              aria-label="search"
              data-testid="query-button"
            >
              <SearchIcon sx={ { fill: '#2FC18C' } } />
            </IconButton>)}
        </Paper>
        <StyledImg src={ logo } alt="" />
        <IconButton
          onClick={ handleClick }
          data-testid="shopping-cart-button"
        >
          <ShoppingCartIcon itensCar={ itensCar } />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
