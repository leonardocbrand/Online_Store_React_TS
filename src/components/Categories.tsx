import { useEffect, useState } from 'react';
import { Divider,
  List,
  ListItem,
  ListItemText,
  Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { Category, ProductsData } from '../types';
import DrawerComp from './DrawerComponent';

type PropComponent = {
  setProducts: React.Dispatch<React.SetStateAction<ProductsData[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function Categories({ setProducts, setLoading }: PropComponent) {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = (name: string) => {
    const getData = async () => {
      setLoading(true);
      const data = await getProductsFromCategoryAndQuery('', name);
      setLoading(false);
      setProducts(data.results);
    };
    getData();
  };

  useEffect(() => {
    const categorys = async () => {
      const listCategory = await getCategories();
      setCategoryList(listCategory);
    };
    categorys();
  }, []);

  return (
    isMatch ? (
      <DrawerComp list={ categoryList } handleClick={ handleClick } />
    ) : (
      <Stack
        spacing={ 2 }
        justifyContent="center"
        p={ 3 }
        component="section"
      >
        <Typography variant="h6" fontWeight="700">Categorias</Typography>
        <Divider />
        <List sx={ { overflowY: 'auto' } }>
          {categoryList.map((item) => {
            return (
              <ListItem
                button
                divider
                onClick={ () => handleClick(item.name) }
                data-testid="category"
                key={ item.id }
              >
                <ListItemText primary={ item.name } />
              </ListItem>
            );
          })}
        </List>
      </Stack>
    )
  );
}

export default Categories;
