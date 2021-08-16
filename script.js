const addItens = document.querySelector('.items');
const addCart = document.querySelector('.cart__items');
const btnEmpty = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui.
 addCart.removeChild(event.target);
}

function emptyCart() {
  addCart.innerHTML = '';
}

btnEmpty.addEventListener('click', emptyCart);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function apiToItem(id, title, thumbnail) {
  addItens.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
}

function apiToCart(id, title, price) {
  addCart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
}

const fetchAddToCart = (itemId) => {
  fetch(`https://api.mercadolibre.com/items/${itemId}`)
  .then((response) => response.json()
  .then((dados) => {
     [dados].map(({ id, title, price }) => apiToCart(id, title, price));
 }));
 };

const itemListener = () => {
  addItens.addEventListener('click', (event) => { 
  const itemSku = getSkuFromProductItem(event.target.parentNode);
  fetchAddToCart(itemSku);
  }); 
};

const fetchMercadoLivre = (product) => {
fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
 .then((response) => response.json()
 .then((dados) => {
    dados.results.map(({ id, title, thumbnail }) => apiToItem(id, title, thumbnail));
}));
};

window.onload = () => { 
  itemListener();
  fetchMercadoLivre('computador');
 };
