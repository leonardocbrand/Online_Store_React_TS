import { useState } from 'react';
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
          </button>
        );
      })}
    </div>
  );
}

export default Categories;
