// Script.js

const myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {

  if(myStorage.length == 0) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => storeProducts(data))
      .then(() => loadProducts());
  } else {
    loadProducts();
  }
});

function storeProducts(products) {

  let i;

  myStorage.setItem("productCount", products.length);

  for(i = 0; i < products.length; i++) {

    myStorage.setItem(products[i].id + "-title", products[i].title);
    myStorage.setItem(products[i].id + "-price", products[i].price);
    myStorage.setItem(products[i].id + "-image", products[i].image);
  }
}

function loadProducts() {

  let i;

  let ul = document.getElementById("product-list")

  for(i = 1; i <= myStorage.getItem("productCount"); i++) {

    let title = myStorage.getItem(i + "-title");
    let price = myStorage.getItem(i + "-price");
    let img = myStorage.getItem(i + "-image");

    const product = document.createElement('product-item');

    product.setAttribute('title-text', title);
    product.setAttribute('price-text', price);
    product.setAttribute('img', img);

    if(product.isInCart()) {

      document.getElementById('cart-count').innerHTML = 
        parseInt(document.getElementById('cart-count').innerHTML) + 1;
    }

    ul.appendChild(product);

  }
}