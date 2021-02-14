// Script.js

const myStorage = window.localStorage;

// When the DOM content is loaded, do the following:
window.addEventListener('DOMContentLoaded', () => {

  // If the local storage is empty, this means it is first time the
  //   user entered, meaning they should fetch the products.
  if(myStorage.length == 0) {

    // Fetch the products, then store them into local storage, and finally
    //   load the products onto the store page.
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => storeProducts(data))
      .then(() => loadProducts());

  } else {

    // Otherwise simply load the products.
    loadProducts();
  }
});

/**
 * Stores the given products into local storage.
 * @param {*} products Array of the product information fetched.
 */
function storeProducts(products) {

  let i;

  // Set the product count to be equal to the amount of products given.
  myStorage.setItem("productCount", products.length);

  // For each product, insert the title, price, and image of the product into
  //   local storage.
  for(i = 0; i < products.length; i++) {

    myStorage.setItem(products[i].id + "-title", products[i].title);
    myStorage.setItem(products[i].id + "-price", products[i].price);
    myStorage.setItem(products[i].id + "-image", products[i].image);
  }
}

/**
 * Load the products from local storage onto the store page.
 */
function loadProducts() {

  let i;

  let ul = document.getElementById("product-list")

  // For each product, load it into the store page
  for(i = 1; i <= myStorage.getItem("productCount"); i++) {

    // Get the title, price, and image of the current product from the local
    //   storage.
    let title = myStorage.getItem(i + "-title");
    let price = myStorage.getItem(i + "-price");
    let img = myStorage.getItem(i + "-image");

    // Create the product-item element
    const product = document.createElement('product-item');

    // Insert the attributes of the product-item.
    product.setAttribute('img', img);
    product.setAttribute('title-text', title);
    product.setAttribute('price-text', price);

    // If the product was in the cart from a previous session, then increment
    // the cart to show this.
    if(product.isInCart()) {

      document.getElementById('cart-count').innerHTML = 
        parseInt(document.getElementById('cart-count').innerHTML) + 1;
    }

    // Finally, append the product into the list
    ul.appendChild(product);

  }
}