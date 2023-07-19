function alertBox(message, msgClass) {
    const bgColor = msgClass == "success" ? "green" : "red";
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = 0;
    div.style.right = 0;
    div.style.zIndex = 999;
    div.style.width = "200px";
    div.style.height = "80px";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = `${bgColor}`;
    div.style.color = "#fff";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.textContent = `${message}`;
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
  
    //make the box disappear after 5sec
    setTimeout(() => {
      div.style.display = "none";
    }, 5000);
}

function displayNumberOfItemsInCart() {
    const items = getStoreCartItems();
    document.getElementsByClassName("cart-count")[0].textContent = items.length;
}

function getStoreCartItems() {
    return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
}

function getStore() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
}

function formatPrice(price) {
    const fomattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "NGN",
    }).format(+price);
  
    return fomattedPrice;
}

function cartTotal() {
    const carts = getStoreCartItems();

    const total = carts.map((products) => products.price).reduce((acc, curPrice) => acc + curPrice, 0);

    return total;
}

function increamentHandler(e){
    const title = e.target.parentElement.parentElement.getElementsByClassName("cart-title")[0].textContent;
    let inputValue = e.target.parentElement.parentElement.getElementsByClassName("cart-items-qty")[0].value;
  
    inputValue++;
    console.log(inputValue, "inputValue");
  
    //check that inputValue is not less than 1
    if (inputValue < 1) {
      e.target.value = 1
      return;
    };

    const product = getStore();

    const index1 = product.findIndex((item) => item.title.toLowerCase() === title.toLowerCase());

    const foundProduct = product[index1];

    const productPrice = +foundProduct.price;
  
    const cartItems = getStoreCartItems();
  
    const copy = [...cartItems];
  
    const index = copy.findIndex((item) => item.title.toLowerCase() === title.toLowerCase());
  
    const foundCartItem = copy[index];
    
    foundCartItem.qty = +inputValue;
  
    foundCartItem.price = foundCartItem.price + productPrice;
  
    console.log(foundCartItem.price, "foundCartItem.price");
  
     //save the update
    localStorage.setItem("cart", JSON.stringify(copy));
  
     //call cartTotal
    //displayCartTotal(cartTotal());
  
    e.target.parentElement.parentElement.getElementsByClassName("cart-items-qty")[0].value = foundCartItem.qty;
    e.target.parentElement.parentElement.getElementsByClassName("cart-items-price")[0].textContent = foundCartItem.price;
}

function decreamentHandler(e){
    const title = e.target.parentElement.parentElement.getElementsByClassName("cart-title")[0].textContent;
    let inputValue = e.target.parentElement.parentElement.getElementsByClassName("cart-items-qty")[0].value;
  
    inputValue--;
    console.log(inputValue, "inputValue");
  
    //check that inputValue is not less than 1
    if (inputValue < 1) {
      e.target.value = 1
      return;
    };
  
    const product = getStore();

    const index1 = product.findIndex((item) => item.title.toLowerCase() === title.toLowerCase());

    const foundProduct = product[index1];

    const productPrice = +foundProduct.price;

    const cartItems = getStoreCartItems();
  
    const copy = [...cartItems];
  
    const index = copy.findIndex((item) => item.title.toLowerCase() === title.toLowerCase());
  
    const foundCartItem = copy[index];
    
    foundCartItem.qty = +inputValue;
  
    foundCartItem.price = foundCartItem.price - productPrice;
  
    console.log(foundCartItem.price, "foundCartItem.price");
  
     //save the update
    localStorage.setItem("cart", JSON.stringify(copy));
  
     //call cartTotal
    //displayCartTotal(cartTotal());
  
    e.target.parentElement.parentElement.getElementsByClassName("cart-items-qty")[0].value = foundCartItem.qty;
    e.target.parentElement.parentElement.getElementsByClassName("cart-items-price")[0].textContent = foundCartItem.price;
}

export {
    alertBox,
    displayNumberOfItemsInCart,
    getStoreCartItems,
    formatPrice,
    cartTotal,
    increamentHandler,
    decreamentHandler,
    getStore
  };

