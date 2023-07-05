import { useState } from 'react';
import { getCategories } from '../services/api';

type Category = {
  id: string;
  name: string;
};

function Categories() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  getCategories().then((list) => {
    setCategoryList(list);
  });
  return (
    <div>
      <h3>Categorias:</h3>
      { categoryList.map((item) => {
        return <button data-testid="category" key={ item.id }>{item.name}</button>;
      }) }
    </div>
  );
}

export default Categories;
