import Categories from '../components/Categories';

function HomePage() {
  return (
    <main>
      <input type="text" name="" id="" />
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
      <Categories />
    </main>
  );
}

export default HomePage;
