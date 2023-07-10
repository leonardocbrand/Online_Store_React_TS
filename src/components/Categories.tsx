import { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsData } from '../types';

type Category = {
  id: string;
  name: string;
};

type PropComponent = {
  setProducts: React.Dispatch<React.SetStateAction<ProductsData[]>>;
};

function Categories({ setProducts }: PropComponent) {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const handleClick = (name: string) => {
    const getData = async () => {
      const data = await getProductsFromCategoryAndQuery('', name);
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
  );
}

export default Categories;
