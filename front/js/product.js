
// Get product ID //
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

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

// Fill html //
const selectedColor = document.querySelector("#colors");
const selectedQuantity = document.querySelector("#quantity");
const button = document.querySelector("#addToCart");

// Functions //
let productSelection = (product) => {
  
  document.querySelector("head > title").textContent = product.name;
  document.querySelector(".item__img")
  .innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent += product.name;
  document.querySelector("#price").textContent += product.price;
  document.querySelector("#description").textContent += product.description;

   for (color of product.colors) {
    let option = document.createElement("option");
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectedColor.appendChild(option);
  }
};

// Cart function //
function productDetails(product) {

  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (selectedColor.value == false) {
      confirm("Please select a color");
    } else if (selectedQuantity.value == 0) {
      confirm("Please select a quantity");
    } else {
      alert("Added to cart");

// Get product details //
    let productSelection = {
      id: product._id,
      name: product.name,
      img: product.imageUrl,
      altTxt: product.altTxt,
      description: product.description,
      color: selectedColor.value,
      quantity: parseInt(selectedQuantity.value, 10),
    };
