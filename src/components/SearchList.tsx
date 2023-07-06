import { ProductsData } from '../types';

type SearchListProps = {
  products: ProductsData[];
};

function SearchList({ products }: SearchListProps) {
  return (
    <section>
      {
        products.length === 0
          ? (
            <h2 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>
          ) : (
            products.map((product: ProductsData) => (
              <div key={ product.id } data-testid="product">
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt="" />
                <p>{`${product.currency_id} ${product.price}`}</p>
              </div>
            ))
          )
        }
    </section>
  );
}
// requisito 08
export default SearchList;
