// Get existing cart
async function viewCart() {
  return JSON.parse(localStorage.getItem("myCart")) ?? [];
}

// Get product info
async function getProduct(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  return response.json();
}

// DOM elements
const priceTotal = document.getElementById("totalPrice");
const cartProducts = document.getElementById("cart__items");
const qtyTotal = document.getElementById("totalQuantity");

// HTML fill
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

// Display new cart
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

// Display for empty cart
let cartContents = viewCart();
if (cartContents > 0) {
  displayCart(viewCart);
} else {
  cartProducts.innerHTML = "<h1> is currently empty </h1>";
  priceTotal.textContent = "0";
  qtyTotal.textContent = "0";
}

// Validate form entry - Regex
function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.value.match(mailformat)) {
    alert("Valid email address!");
    document.form1.text1.focus();
    return true;
  } else {
    alert("You have entered an invalid email address!");
    document.form1.text1.focus();
    return false;
  }
}

// Check contact form information
function order() {
  const orderBtn = document.getElementById("order");
  orderBtn.addEventListener("click", (data) => {
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    // Test form fields
    if (testFirstName(contact.firstName) &&
      testName(contact.lastName) == true &&
      testcity(contact.city) == true &&
      testemail(contact.email) == true &&
      testlocation(contact.address) == true) {
      // Create "products" table for back
      data.preventDefault();
      let cart = getCart();
      let products = [];

      // Push product ID from local storage into "products" table
      for (let item of cart) {
        products.push(article.idProduct);
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
        // Display error
        .catch((err) => {
          console.log("Error in request: " + err.message);
        });
    }
  });
}

order();
