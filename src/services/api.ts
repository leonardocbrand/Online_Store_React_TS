export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await response.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(CATEGORY: string, QUERY: string) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY}_ID&q=${QUERY}`);
  const result = await response.json();
  return result;
}

export async function getProductById(PRODUCTID:string) {
  const response = await fetch(`https://api.mercadolibre.com/items/${PRODUCTID}`);
  const result = await response.json();
  return result;
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
