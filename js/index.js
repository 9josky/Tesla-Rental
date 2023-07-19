import { displayNumberOfItemsInCart } from "./common.js";

if (document.readyState === "loading"){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready ()
}

function ready() {
    displayNumberOfItemsInCart();
}