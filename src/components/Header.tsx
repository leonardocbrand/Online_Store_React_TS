import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, IconButton, InputBase, Paper } from '@mui/material';
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
    <AppBar
      sx={ {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        p: '0px 20px 0 20px',
        alignItems: 'center',
      } }
    >
      <Paper
        component="form"
        onSubmit={ handleSubmit }
        sx={ {
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: { xs: 200, sm: 230 },
          height: 35,
        } }
      >
        <InputBase
          sx={ { ml: 1, flex: 1 } }
          placeholder="Buscar produto"
          autoComplete="off"
          inputProps={ { 'aria-label': 'search product' } }
          type="text"
          name="search"
          data-testid="query-input"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
        <IconButton
          type="submit"
          sx={ { p: '10px' } }
          aria-label="search"
          data-testid="query-button"
        >
          <SearchIcon sx={ { fill: '#2FC18C' } } />
        </IconButton>
      </Paper>
      <StyledImg src={ logo } alt="" />
      <IconButton
        onClick={ handleClick }
        data-testid="shopping-cart-button"
      >
        <ShoppingCartIcon itensCar={ itensCar } />
      </IconButton>
    </AppBar>
  );
}

export default Header;
