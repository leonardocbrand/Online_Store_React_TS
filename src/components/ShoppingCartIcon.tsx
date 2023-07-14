import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { ProductsData } from '../types';

type PropsIconCart = {
  itensCar: ProductsData[];
};

function ShoppingCartIcon({ itensCar }: PropsIconCart) {
  const qtdCarrinho = JSON.parse(localStorage.getItem('qtdCarrinho') || '0');
  const [amountCart, setAmountCart] = useState(qtdCarrinho);

  useEffect(() => {
    const setAmountIcon = () => {
      const quantityCart = itensCar
        .reduce((acumulador: number, produto: ProductsData) => {
          return acumulador + produto.quantidade;
        }, 0);
      localStorage.setItem('qtdCarrinho', JSON.stringify(quantityCart));
      setAmountCart(quantityCart);
    };
    setAmountIcon();
  }, [itensCar]);

  return (
    <Box display="flex" alignItems="center">
      <span
        style={ {
          backgroundColor: '#2FC18C',
          color: 'white',
          borderRadius: '100px',
          width: '1rem',
          height: '1rem',
          fontSize: '14px',
          position: 'absolute',
          transform: 'translate(90%, -70%)',
        } }
      >
        {amountCart}

      </span>
      <ShoppingCart />
    </Box>
  );
}

export default ShoppingCartIcon;
