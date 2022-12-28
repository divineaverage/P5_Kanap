// Get product ID //
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

function init() {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
      return response.json();
    })

    .then((product) => {
      productSelection(product);
      productDetails(product);
    })
    .catch((error) => {
      alert(error);
    });
}

// Functions //
let productSelection = (product) => {
  document.querySelector("head > title").textContent = product.name;
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent += product.name;
  document.querySelector("#price").textContent += product.price;
  document.querySelector("#description").textContent += product.description;
  const selectedColor = document.querySelector("#colors");

  for (color of product.colors) {
    let option = document.createElement("option");
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectedColor.appendChild(option);
  }
};

// User functionality //
function productDetails(product) {
  const selectedQuantity = document.querySelector("#quantity");
  const button = document.querySelector("#addToCart");
  const selectedColor = document.querySelector("#colors");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (selectedColor.value == false) {
      alert("Please select a color");
    } else if (selectedQuantity.value == 0) {
      alert("Please select a quantity");
    } else {
      alert("Added to cart");
    }

    // Get product selection details //
    let userSelection = {
      id: product._id,
      name: product.name,
      img: product.imageUrl,
      altTxt: product.altTxt,
      description: product.description,
      color: selectedColor.value,
      quantity: parseInt(selectedQuantity.value, 10),
      price: product.price * parseInt(selectedQuantity.value, 10),
    };

    // Local Storage //
    let previousCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    let item = previousCart.find(
      (item) =>
        item.id === userSelection.id && userSelection.color === item.color
    );
    if (item) {
      const itemIndex = previousCart.findIndex(
        (item) =>
          item.id === userSelection.id && userSelection.color === item.color
      );
      previousCart.splice(itemIndex);
      userSelection.quantity += item.quantity;
    }
    previousCart.push(userSelection);
    localStorage.setItem("cart", JSON.stringify(previousCart));
  });
}

init();