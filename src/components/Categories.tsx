import { SetStateAction, useState } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsData } from '../types';

type Category = {
  id: string;
  name: string;
};

function Categories({ setProducts }) {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const handleClick = (name: string) => {
    const getData = async () => {
      const data = await getProductsFromCategoryAndQuery('', name);
      setProducts(data.results);
      console.log('ok');
    };
    getData();
  };

  getCategories().then((list) => {
    setCategoryList(list);
  });
  return (
    <div>
      <h3>Categorias:</h3>
      {categoryList.map((item) => {
        return (
          <button
            onClick={ () => handleClick(item.name) }
            data-testid="category"
            key={ item.id }
          >
            {item.name}
        </button>);
      })}
    </div>
  );
}

export default Categories;
