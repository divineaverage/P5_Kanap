async function fetchProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    if (typeof data === 'undefined') {
        return alert ('something is wrong!')
    }
}

fetchProducts().then(products => {
    products;
});

const article = document.getElementsByClassName('article');
const link = document.getElementsByClassName('a');
const image = document.getElementsByClassName('img');
const productName = document.getElementsByClassName('productName');
const productDescription = document.getElementsByClassName ('productDescription');

apiRequest.open('GET', 'http://localhost:3000/api/products'); apiRequest.send();