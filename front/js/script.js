async function fetchProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    return response.json();
    }

// Get DOM elements
const productContainer = document.getElementById ('items');


fetchProducts().then(products => {
    for (let product of products) {
        const productElement = `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altText}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`;
        productContainer.innerHTML += productElement
    }
});



