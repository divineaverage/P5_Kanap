// Display ID
function getParam(param) {
    let url = new URL(window.location.href);
    let result = url.searchParams.get(param);

    return result;
}
let id = getParam("id");
document.getElementById("orderId").textContent = id;
localStorage.clear();