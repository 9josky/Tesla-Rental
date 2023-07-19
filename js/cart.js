import {
    alertBox,
    displayNumberOfItemsInCart,
    getStoreCartItems,
    formatPrice,
    cartTotal,
    increamentHandler,
    decreamentHandler,
} from "./common.js";

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
}

function ready(){
    displayNumberOfItemsInCart();

    displayCartItems();

    displayCartTotal();

    const deleteCartItemBtn = document.querySelectorAll(".cart-items-remove");
    deleteCartItemBtn.forEach((btn) => {
        btn.addEventListener("click", removeCartHandler)
    });

    // const qtyInputBtn = document.querySelectorAll(".cart-items-qty");

    // qtyInputBtn.forEach((btn) => {
    //   btn.addEventListener("click", increamentHandler);
    // });

    const plusBtn = document.querySelectorAll(".plus-btn");

    plusBtn.forEach((btn) => {
      btn.addEventListener('click', increament)
    });

    const minusBtn = document.querySelectorAll(".minus-btn");

    minusBtn.forEach((btn) => btn.addEventListener('click', decreament));
}

function removeCartHandler(e) {
    const title = e.target.parentElement.parentElement.getElementsByClassName("cart-title")[0].textContent;

    const store = getStoreCartItems();
    const copy = [...store];

    const newCartItems = copy.filter((item) => item.title.toLowerCase() !== title.toLowerCase());

    localStorage.setItem("cart", JSON.stringify(newCartItems));

    location.reload();
}

function displayCartItems() {
    const cart = getStoreCartItems();
    console.log(cart);
    displayCartItemsToUI(cart);
}






let valueCount;




function increament(e) {
  
  increamentHandler(e);

  //call cartTotal
  displayCartTotal();
}


function decreament(e) {
  decreamentHandler(e);

  //call cartTotal
  displayCartTotal();
}

// function priceTotal() {
//     const cartItems = getStoreCartItems();

//     const copy = [...cartItems];
//     console.log(copy, "copy");
  
//     //find the index of the item first
//     const index = copy.findIndex(
//       (item) => item.title.toLowerCase() === title.toLowerCase()
//     );

//     console.log(index, "index");
  
//     //find item by the index
//     const foundCartItem = copy[index];
  
//     //update the old qty to the new qty
//     foundCartItem.qty = +valueCount;
  
//     //save the update
//     localStorage.setItem("cart", JSON.stringify(copy));
  
//     //call cartTotal
//     displayCartTotal();
  
// }


function displayCartItemsToUI(cart) {
    const cartBox = document.getElementsByTagName("tbody")[0];
    cartBox.innerHTML = "";
    cart &&
      cart.length > 0 &&
      cart.forEach((product) => {
        const cartItem = document.createElement("tr");
        cartItem.className = "cart-items";
        cartItem.innerHTML = `
    
        <td class="cart-items-title">
        <img 
          src=${product.imageUrl}
          alt="cart image"
          width="100px"
          height="100px"
        />
        <span class="cart-title">${product.title}</span>
      </td>
      <td class="cart-items-price">${product.price}</td>
      <td class="cart-items-qty-container">
        <button class="minus-btn">-</button>
        <input class="cart-items-qty" type="text" value=${product.qty} />
        <button class="plus-btn">+</button>
        <button class="btn cart-items-remove">REMOVE</button>
      </td>
          
          `;
  
        cartBox.appendChild(cartItem);
    });
}


function displayCartTotal() {
    document.getElementsByClassName("cart-total")[0].textContent = `Total: ${formatPrice(cartTotal())}`;

}