//Get existing cart
async function viewCart() {
  return JSON.parse(localStorage.getItem("myCart"));
}


//Get product info
async function getProduct(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  return response.json();
}

//DOM elements
const priceTotal = document.getElementById("totalPrice");
const cartProducts = document.getElementById("cart__items");
const qtyTotal = document.getElementById("totalQuantity");

//HTML fill
function fillCartHTML(product, item) {
  return `<article class="cart__item" data-id="${item.idProduct}" data-color="${item.colorProduct}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${item.colorProduct}</p>
      <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>`;
}

//Display new cart
async function displayCart(products) {
  let qty = 0;
  let price = 0;
  for (const product of products) {
    await getProduct(item.idProduct).then(function (prod) {
      cartProducts.innerHTML += getCartItemHTML(prod, item);
      //price
      price += prod.price * item.qtyProduct;
      priceTotal.textContent = price;
      //quantity
      qty += item.qtyProduct;
      qtyTotal.textContent = qty;
    });
  }
  return true;
}

//display for empty cart
let cartContents = viewCart();
if (cartContents > 0) {
    displayCart(viewCart)
} else {
    cartProducts.innerHTML = "<h1> is currently empty </h1>";
    priceTotal. textContent = "0";
    qtyTotal. textContent = "0";
}
