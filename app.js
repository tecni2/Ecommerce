let showCart = false

const products = [
  {
    image: "./imagenes/21729-4-saucony-grid-9000.png",
    title: "saucony",
    price: 306,
    id: 1,
  },
  {
    image: "./imagenes/28116-8-nike-shoes.png",
    title: "Nike",
    price: 485,
    id: 2,
  },
  {
    image: "./imagenes/3-2-shoes-transparent.png",
    title: "Zapatito",
    price: 685,
    id: 3,
  },
  {
    image: "./imagenes/8-2-shoes-picture.png",
    title: "Reaboks",
    price: 186,
    id: 4
  },
]
const productContainer = document.querySelector(".product-container");

const cartIcon = document.querySelector(".cart");
const cart = document.querySelector(".cart-content");
const cartContainer = document.querySelector(".cart-item-container");
const showTotal = document.querySelector(".span-total")
let productsInCart = [];

if (localStorage.getItem("cart") && productsInCart.length == 0) {
  productsInCart = JSON.parse(localStorage.getItem("cart"));
  // for (product of productsInCart) {
  //   if(productsInCart.length < 10)
  //   console.log("bucle");
  //   // addToCart(product.id);
  // }
  console.log(productsInCart);
}

if (productsInCart.length > 0) {
  console.log("bucle2");
  addToOther(productsInCart)
}

// const buttonToClick = document.querySelector(".button-click");
// const 

for (product of products) {
  putProduct(product);
}

console.log(productContainer);

// buttonToClick.addEventListener("click", () => {
//   console.log("clikeado");
//   createCartItem()
// });

cartIcon.addEventListener("click", () => {
  // console.log("clikeado");
  if (showCart) {
    cart.style.display = "none"
    showCart = !showCart
  } else {
    cart.style.display = "flex"
    showCart = !showCart
  }
});

function totalPrice(productsInCart) {
  let sum = 0

  for (product of productsInCart) {
    sum += product.price;
  }

  return `$${sum}`
}

function putProduct(product) {
  article = document.createElement("article");
  article.innerHTML = `
            <div class="product-image">
              <img src="${product.image}" alt="" />
            </div>
            <div class="product-description">
              <p>${product.title}</p>
              <span>$${product.price}</span>
            </div>
            <button class="button-click" onclick="addToCart(${product.id})">Comprar</button>
  `
  productContainer.appendChild(article);
}

// function createCartItem() {
//   let div = document.createElement("div");
//   div.classList.add("cart-item");
//   div.innerHTML = `
//   <div class="cart-content-image">
//     <img src="./imagenes/9-2-shoes-png-image.png" alt="" />
//   </div>
//   <div class="cart-description">
//     <p>Zapatos de cuero</p>
//     <span>stock: 14 |</span><span>$21.56</span>
//     <p>Subtotal: $21.56</p>
//     <div class="cart-buttoms">
//       <button>-</button>
//       <p>1 unidad(es)</p>
//       <button>+</button>
//       <object class="cart-trash" data="./iconos/trash-solid.svg" type=""></object>
//     </div>
//   </div>
//   `
//   cartContainer.appendChild(div);
// }

function addToOther(obj) {
  for (product of obj) {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
    <div class="cart-content-image">
      <img src="${product.image}" alt="" />
    </div>
    <div class="cart-description">
      <p>${product.title}</p>
      <span>stock: 14 |</span><span>$21.56</span>
      <p>Subtotal: $${product.price}</p>
      <div class="cart-buttoms">
        <button>-</button>
        <p>1 unidad(es)</p>
        <button>+</button>
        <object class="cart-trash" data="./iconos/trash-solid.svg" type=""></object>
      </div>
    </div>
    `
    cartContainer.appendChild(div);
    console.log("bucle3");
  }
}

function addToCart(id) {
  const product = products.find((product) => product.id == id);

  let div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `
  <div class="cart-content-image">
    <img src="${product.image}" alt="" />
  </div>
  <div class="cart-description">
    <p>${product.title}</p>
    <span>stock: 14 |</span><span>$21.56</span>
    <p>Subtotal: $${product.price}</p>
    <div class="cart-buttoms">
      <button>-</button>
      <p>1 unidad(es)</p>
      <button>+</button>
      <object class="cart-trash" data="./iconos/trash-solid.svg" type=""></object>
    </div>
  </div>
  `
  cartContainer.appendChild(div);
  productsInCart.push(product);
  showTotal.innerHTML = totalPrice(productsInCart);
  localStorage.setItem("cart", JSON.stringify(productsInCart));
}

// putProduct();

// console.log(cartIcon);