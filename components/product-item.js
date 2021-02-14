// product-item.js


class ProductItem extends HTMLElement {

  inCart = false;

  constructor() {

    super();

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

    this.root = this.attachShadow({mode: 'open'});

    let product = document.createElement('li');
    product.setAttribute('class', 'product');

    const img = product.appendChild(document.createElement('img'));

    const title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');

    const price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');

    const button = product.appendChild(document.createElement('button'));
    button.onclick = () => this.buttonClick(button, title);
    button.innerText = 'Add to Cart';

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style.css');

    this.root.append(style);
    this.root.append(product);
  }

  static get observedAttributes() {
    return ['title-text', 'price-text', 'img'];
  }

  buttonClick(button, title) {

    const myStorage = window.localStorage;

    if(!this.inCart){

      document.getElementById('cart-count').innerHTML = 
        parseInt(document.getElementById('cart-count').innerHTML) + 1;

      button.innerText = 'Remove from Cart';

      myStorage.setItem(title.innerHTML, 'in cart');

      alert('Added to Cart!');

    } else {

      document.getElementById('cart-count').innerHTML = 
        parseInt(document.getElementById('cart-count').innerHTML) - 1;

      button.innerText = 'Add to Cart';

      myStorage.removeItem(title.innerHTML);
    }

    this.inCart = !this.inCart;
  }

  attributeChangedCallback(name, oldValue, newValue) {

    const product = this.shadowRoot.lastChild;

    if(name == 'title-text') {

      for(let i = 0; i < product.childNodes.length; i++) {

        if(product.childNodes[i].className == 'title') {

          product.childNodes[i].innerText = newValue;

          return;
        }
      }

    } else if (name == 'price-text') {

      for(let i = 0; i < product.childNodes.length; i++) {

        if(product.childNodes[i].className == 'price') {

          product.childNodes[i].innerText = newValue;

          return;
        }
      }

    } else if (name == 'img') {

      for(let i = 0; i < product.childNodes.length; i++) {
        
        if(product.childNodes[i].nodeName == 'IMG') {

          product.childNodes[i].src = newValue;

          return;
        }
      }
    }
  }

  isInCart () {

    const myStorage = window.localStorage;

    const product = this.shadowRoot.lastChild;

    let button;

    let title;

    for(let i = 0; i < product.childNodes.length; i++) {

      if(product.childNodes[i].nodeName == 'BUTTON') {

        button = product.childNodes[i];

      } else if (product.childNodes[i].className == 'title') {

        title = product.childNodes[i];
      }
    }

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