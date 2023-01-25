// Get product info
async function getProduct(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  return response.json();
}

// DOM elements
const cartProducts = document.getElementById("cart__items");
const priceTotal = document.getElementById("totalPrice");
const quantityTotal = document.getElementById("totalQuantity");
const cart = JSON.parse(localStorage.getItem("cart"));

// HTML fill
function fillCartHTML(product) {
  return `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.img}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p class="item__subtotal">${product.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity: </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>`;
}

// Get existing cart from Local Storage
function getCartFromLS() {
  const cart = localStorage.getItem("cart");
  if (typeof cart === "string") {
    return JSON.parse(cart);
  }
  return cart || [];
}

//Populate cart
function displayCart(products) {
  for (const product of products) {
    cartProducts.innerHTML += fillCartHTML(product);
  }

  deleteItem();
  modifyItemQty();
  resetTotal();
}



//Delete item
function deleteItem() {
  let buttons = document.getElementsByClassName("deleteItem");
  console.log("Delete item", buttons);

  for (const button of buttons) {
    button.addEventListener("click", function (e) {
      const itemToDelete = e.target.closest(".cart__item");
      console.log(e);

      const { color, id } = itemToDelete.dataset;

      itemToDelete.parentNode.removeChild(itemToDelete);
      const cart = getCartFromLS();
      const newCart = cart.filter((product) => {
        if (product.color === color && product.id === id) {
          return false;
        }
        return true;
      });

      setCartToLS(newCart);
      resetTotal(newCart);
    });
  }
}

//Modify cart

function modifyItemQty() {
  let nodeList = document.getElementsByClassName("itemQuantity");
  let qtyInputs = Array.from(nodeList);
  let htmlCollection = document.getElementsByClassName("item__subtotal");
  let itemSubtotal = Array.prototype.slice.call(htmlCollection);
    
  qtyInputs.forEach(function(qtyInput, i){
    var oldQty = qtyInput.value;
    
    qtyInput.addEventListener("change", function () {
      // console.log("Modify quantity to", qtyInput.value);
      const newQty = qtyInput.value;
      var oldSubtotal = itemSubtotal[i]?.innerHTML;
      // console.log("Old subtotal is", oldSubtotal);
      // console.log("Old quantity is", oldQty);
      var oldSubtotalNum = oldSubtotal.replace("€", " ");
      var itemPrice = oldSubtotalNum /= oldQty;
      // console.log(itemPrice)

      var newSubtotal = itemPrice *= newQty;
      console.log(newSubtotal);
      })
    })
  }


// Reset cart total
function resetTotal(cart) {
  const localCart = cart || getCartFromLS();
  let price = 0;
  let qty = 0;

  for (const product of localCart) {
    price += product.price;
    qty += product.quantity;
  }
  priceTotal.textContent = price;
  quantityTotal.textContent = qty;
}

// Set new cart to Local Storage
function setCartToLS(cart) {
  if (typeof cart === "string") {
    localStorage.setItem("cart", cart);
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

// Display for empty cart
let cartContents = getCartFromLS();
console.log(cartContents);
if (cartContents.length > 0) {
  displayCart(cartContents);
} else {
  cartProducts.innerHTML = "<h1> is currently empty.</h1>";
  priceTotal.textContent = "0";
  quantityTotal.textContent = "0";
}

// Validate form entry - Regex
function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    alert("Valid email address!");
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
}

function validate(inputText) {
  if (inputText.trim()) {
    return true;
  } else {
    return false;
  }
}

// Check contact form information
function order() {
  const orderBtn = document.getElementById("order");
  orderBtn.addEventListener("click", (data) => {
    data.preventDefault();
    data.stopPropagation();
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    // Test form fields
    if (
      validate(contact.firstName) &&
      validate(contact.lastName) == true &&
      validate(contact.city) == true &&
      validateEmail(contact.email) == true &&
      validate(contact.address) == true
    ) {
      // Create "products" table for back
      data.preventDefault();
      let cart = getCartFromLS();
      let products = [];

      // Push product ID from local storage into "products" table
      for (let item of cart) {
        products.push(item.id);
      }
      // Create object
      const order = {
        contact,
        products: products,
      };
      // POST request parameters
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      // Request sent, API returns the order id
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
          console.log("Error in request: " + err.message);
        });
    } else {
      e.preventDefault();
      console.log("Please review the form for errors.");
    }
  });
}

order();
