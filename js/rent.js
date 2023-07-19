import {alertBox, displayNumberOfItemsInCart, getStoreCartItems,formatPrice, getStore} from "./common.js"

if (document.readyState === "loading"){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready ()
}

function ready() {
    //display products if any from local stroage
    displayProducts();

    //update cart count
    displayNumberOfItemsInCart();

    //open add modal
    const addItemModal = document.getElementsByClassName("add-item")[0];
    addItemModal.addEventListener('click', openModal);

    //open close modal
    const closeItemModal = document.getElementsByClassName("fa-times")[0];
    closeItemModal.addEventListener('click', closeModal);

    //add item
    const addItemBtn = document.getElementById("submitItem");
    addItemBtn.addEventListener('click', addItemHandler);

    //ADD TO CART BTN
    const addToCartBtn = document.getElementsByClassName("collection-items-btn");

    for (let i =0; i < addToCartBtn.length; i++) {
        const currentBtn = addToCartBtn[i]
        currentBtn.addEventListener("click", addCartHandler);
    }
}

    function addCartHandler(e) {
        const currentBtn = e.target;
        const collectionItem = currentBtn.parentElement.parentElement;
        
        const title = collectionItem.getElementsByClassName("collection-items-title")[0].textContent;

        const price = collectionItem.getElementsByClassName("collection-items-price")[0].textContent;

        // const id = collectionItem.getElementsByClassName("collection-items-id")[0].textContent;

        // console.log(collectionItem.getElementsByClassName("collection-items-id")[0].textContent, "id");

        // const qty = collectionItem.getElementsByClassName("collection-items-price")[0].textContent;

        const priceFormated = +price.slice(4, price.length - 3).replace(/,/g, "");

        console.log(price);
        const cartItem = {
            title,
            price: priceFormated,
            qty: 1
        };

        addToCart(cartItem);
    }

    function quantity() {}

    function addToCart(cartItem) {
        const cartItems = getStoreCartItems();

        //create a copy of cartitems
        const cartItemCopy = [...cartItems];

        //push new item into cartitemcopy
        cartItemCopy.push(cartItem);

        //update local storage with the new update
        localStorage.setItem("cart", JSON.stringify(cartItemCopy));

        //update cart count
        displayNumberOfItemsInCart();

        alertBox("Item added to cart", "success");
    }


    //open modal
    function openModal() {
        const openModal = document.querySelector(".add-modal");
        openModal.classList.add("open");
    }

    //close modal
    function closeModal() {
        const closeModal = document.querySelector(".add-modal");
        closeModal.classList.remove("open");
    }

    function addItemHandler(e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const price = document.getElementById("price").value.trim();
        const imageUrl = document.getElementById("imageUrl").value.trim();
        const desc = document.getElementById("desc").value.trim();

        if(!title || !price || !imageUrl || !desc){
            alertBox("All fields required");
        };

        const item = {
            id: title + "-" + Math.random() * 1000000,
            title,
            price,
            imageUrl,
            desc,
        };

        console.log(item[0], "id");
        
          //save to local storage
        saveToStore(item);
        
          //clear input field
        clearAddItemInputs();
        
        displayProducts();

        closeModal();
    
    }

    function saveToStore(item) {
        const productsFromStore = getStore();
      
        //create a copy of store to prevent modifying store directly
        const storeCopy = [...productsFromStore]; //productsFromStore.slice()
      
        //push item to array
        storeCopy.push(item);
      
        //save back the new update to store
        localStorage.setItem("products", JSON.stringify(storeCopy));
      }
      
      function clearAddItemInputs() {
        document.getElementById("title").value = "";
        document.getElementById("price").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("desc").value = "";
      }

      //display products
    function displayProducts() {
        //get products from store
        const products = getStore();
        // display product to UI
        displayProductsToUI(products);
    }
  
  function displayProductsToUI(products) {
    const collection = document.getElementsByClassName("collection")[0];
    collection.innerHTML = "";
    products &&
      products.length > 0 &&
      products.forEach((product) => {
        const collectionItem = document.createElement("div");
        collectionItem.className = "collection-item";
        collectionItem.innerHTML = `
  
        <div style="width: 100%; height: 300px">
        <img
          src=${product.imageUrl}
          alt="items"
          class="collection-img"
        />
      </div>
      <span class="collection-items-id">${product.id}<span>
  
      <h4 class="collection-items-title">${product.title}</h4>
      <p>${product.desc}
      <div class="collection-items-footer">
        <span class="collection-items-price">${formatPrice(product.price)}</span>
        <button class="btn collection-items-btn">ADD TO CART</button>
      </div>
        
        `;
  
        collection.appendChild(collectionItem);
      });
  }
  
  

  

