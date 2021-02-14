// product-item.js


/**
 * Class which contains the functionality of the product-item HTML element.
 */
class ProductItem extends HTMLElement {

  // Used to determine if the item is or is not in the cart. Important for
  //   determining if the item was found in the local storage.
  inCart = false;

  /**
   * Constructor of the product-item which sets up the style, li, img, price,
   *   button, and title elements.
   */
  constructor() {

    super();

    // Styling element; copied that styling from the style.css file
    let style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`

    // Creates a shadow root
    this.root = this.attachShadow({mode: 'open'});

    // The li element with the class product; every other element is housed in 
    //   the li.
    let product = document.createElement('li');
    product.setAttribute('class', 'product');

    // Image of the product (img).
    const img = product.appendChild(document.createElement('img'));

    // Title of the product (p).
    const title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    // Price of the product (p).
    const price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    // Button which triggers buttonClick on click.
    const button = product.appendChild(document.createElement('button'));
    button.onclick = () => this.buttonClick(button, title);
    button.innerText = 'Add to Cart';

    this.root.append(style);
    this.root.append(product);
  }

  /**
   * Attributes of the product-item. Inclues the img src, the title, and the
   *   price.
   */
  static get observedAttributes() {
    return ['title-text', 'price-text', 'img'];
  }

  /**
   * 
   * @param {*} button Reference of the button of the product-item
   * @param {*} title Reference of the p element housing the title of the
   *                  product-item
   */
  buttonClick(button, title) {

    const myStorage = window.localStorage;

    if(!this.inCart){

      // Increment the cart count by 1.
      document.getElementById('cart-count').innerHTML = 
        parseInt(document.getElementById('cart-count').innerHTML) + 1;

      button.innerText = 'Remove from Cart';

      // Add the item into local storage so it can be remembered if it was in
      //   the cart after refreshing.
      myStorage.setItem(title.innerHTML, 'in cart');

      alert('Added to Cart!');

    } else {

      // Decrement the cart count by 1.
      document.getElementById('cart-count').innerHTML = 
        parseInt(document.getElementById('cart-count').innerHTML) - 1;

      button.innerText = 'Add to Cart';

      // Remoe the item from the local storage as it is no longer in the cart.
      myStorage.removeItem(title.innerHTML);
    }

    this.inCart = !this.inCart;
  }

  /**
   * Called whenever one of the observed attributes is changed.
   * @param {*} name name of the attribute
   * @param {*} oldValue the old value of the attribute (not used)
   * @param {*} newValue the new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {

    // Get the li which houses all the elements which could pssibly be changed
    //   by the attributes.
    const product = this.shadowRoot.lastChild;

    if(name == 'title-text') {

      // Search for the title and image children in the product li element.
      for(let i = 0; i < product.childNodes.length; i++) {

        // Set the inner text of the p title as the new value.
        if(product.childNodes[i].className == 'title') {

          product.childNodes[i].innerText = newValue;

        // Set the alt text of the image as the new value.
        } else if(product.childNodes[i].nodeName == 'IMG') {

          product.childNodes[i].alt = newValue;
        }
      }

    } else if (name == 'price-text') {

      // Search for the price child in the product li element.
      for(let i = 0; i < product.childNodes.length; i++) {

        // Set the inner text of the p price as the new value.
        if(product.childNodes[i].className == 'price') {

          product.childNodes[i].innerText = newValue;

          return;
        }
      }

    } else if (name == 'img') {

      // Search for the image child in the product li element.
      for(let i = 0; i < product.childNodes.length; i++) {
        
        // Set the source of the image as the new value.
        if(product.childNodes[i].nodeName == 'IMG') {

          product.childNodes[i].src = newValue;

          return;
        }
      }
    }
  }

  /**
   * Called in the script after being created. Determines if the product was in
   *   the cart by looking at the local storage, and if it was, change the
   *   button to reflect this.
   * @returns If it is in the cart.
   */
  isInCart () {

    const myStorage = window.localStorage;

    const product = this.shadowRoot.lastChild;

    let button;

    let title;

    // Get the button and title children in the product element.
    for(let i = 0; i < product.childNodes.length; i++) {

      if(product.childNodes[i].nodeName == 'BUTTON') {

        button = product.childNodes[i];

      } else if (product.childNodes[i].className == 'title') {

        title = product.childNodes[i];
      }
    }

    // If the storage finds the key with the item's title, set up the button
    //   to reflect this, set inCart to true and return true.
    if(myStorage.getItem(title.innerHTML) != null) {

      button.innerText = 'Remove from Cart';

      this.inCart = true;

      return true;

    } else {

      button.innerText = 'Add to Cart';

      this.inCart = false;

      return false;
    }
  }

}

customElements.define('product-item', ProductItem);