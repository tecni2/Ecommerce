const buttonBuy = document.querySelector(".button-buy");
const spanItem = document.querySelector(".span-item");
const equis = document.querySelector(".equis");

let showCart = false

const products = [
  {
    image: "./imagenes/21729-4-saucony-grid-9000.png",
    title: "Saucony",
    price: 306,
    id: 1,
    stock: 2
  },
  {
    image: "./imagenes/4-2-shoes-free-download-png.png",
    title: "Adidas",
    price: 835,
    id: 5,
    stock: 10
  },
  {
    image: "./imagenes/28116-8-nike-shoes.png",
    title: "Nike",
    price: 485,
    id: 2,
    stock: 7
  },
  {
    image: "./imagenes/3-2-shoes-transparent.png",
    title: "Zapatito",
    price: 685,
    id: 3,
    stock: 5
  },
  {
    image: "./imagenes/8-2-shoes-picture.png",
    title: "Zapatos de cuero",
    price: 186,
    id: 4,
    stock: 10
  },
  {
    image: "./imagenes/6-2-shoes-png-file.png",
    title: "Zapatos de elegantes",
    price: 225,
    id: 5,
    stock: 18
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

buttonBuy.addEventListener("click", () => {
  buy();
  alert("Gracias por su compra")
})

equis.addEventListener("click", () => {
  if (showCart) {
    cart.style.display = "none"
    showCart = !showCart
  } else {
    cart.style.display = "flex"
    showCart = !showCart
  }
})

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

function addToOther(obj) {
  for (product of obj) {
    let div = document.createElement("div");
    div.classList.add("cart-item", `item-${product.id}`);
    div.innerHTML = `
    <div class="cart-content-image">
      <img src="${product.image}" alt="" />
    </div>
    <div class="cart-description">
      <p>${product.title}</p>
      <span>stock: ${product.stock} |</span><span>$21.56</span>
      <p>Subtotal: $${product.price}</p>
      <div class="cart-buttoms">
        <button onclick="disminuirStock(${product.id})">-</button>
        <p><span>1</span> unidad(es)</p>
        <button onclick="aumentarStock(${product.id})">+</button>
        <img onclick="deleteCartItem(${product.id})" class="cart-trash" src="./iconos/trash-solid.svg"></img>
      </div>
    </div>
    `
    cartContainer.appendChild(div);
    spanItem.innerHTML = productsInCart.length;
    showTotal.innerHTML = totalPrice(productsInCart);

  }
}

function disminuirStock(id) {
  article = document.querySelector(`.item-${id}`)
  product = productsInCart.find(produc => produc.id == id)

  unidades = article.childNodes[3].childNodes[8].childNodes[3].childNodes[0].innerHTML;

  productsInCart.forEach(product2 => {
    maxStock = product.stock;
    if (product2.id == id && unidades > 1) {
      product2.stock++;
      unidades--
      article.childNodes[3].childNodes[8].childNodes[3].childNodes[0].innerHTML = unidades;
      console.log(unidades);
      if (product2.stock >= 0) {
        article.childNodes[3].childNodes[3].innerHTML = `stock: ${product2.stock} |`;
        console.log(product2.stock);
      }
    }
  })
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  // console.log(productsInCart);
}

function aumentarStock(id) {
  article = document.querySelector(`.item-${id}`)

  unidades = article.childNodes[3].childNodes[8].childNodes[3].childNodes[0].innerHTML;
  productsInCart.forEach(product2 => {
    if (product2.id == id) {
      if (product2.stock > 0) {
        unidades++
        console.log(unidades);
        product2.stock--;
        article.childNodes[3].childNodes[3].innerHTML = `stock: ${product2.stock} |`;
        // console.log(product2.stock);
        article.childNodes[3].childNodes[8].childNodes[3].childNodes[0].innerHTML = unidades++;
      } else {
        alert("No tenemos mas unidades de este producto")
      }
    }
  })
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  // console.log(article.childNodes[3].childNodes);
  // console.log(productsInCart);
}

function deleteCartItem(id) {
  article = document.querySelector(`.item-${id}`)
  article.style.display = "none";
  console.log(article);
  productsInCart = productsInCart.filter(product => product.id != id);
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  showTotal.innerHTML = totalPrice(productsInCart);
  spanItem.innerHTML = productsInCart.length;
}

function buy() {
  productsInCart = [];
  localStorage.setItem("cart", JSON.stringify(productsInCart))
  cartContainer.innerHTML = ""
  showTotal.innerHTML = totalPrice(productsInCart);
  spanItem.innerHTML = productsInCart.length;
}

function addToCart(id) {
  produc = productsInCart.find(product => product.id == id)
  if (produc) {
    productsInCart.forEach(prod => {
      if (prod.id == produc.id && prod.stock > 0) {
        prod.stock--
      }
    })
    return
  }

  const product = products.find((product) => product.id == id);

  let div = document.createElement("div");
  div.classList.add("cart-item", `item-${product.id}`);
  div.innerHTML = `
  <div class="cart-content-image">
    <img src="${product.image}" alt="" />
  </div>
  <div class="cart-description">
    <p>${product.title}</p>
    <span>stock: ${product.stock} |</span><span>$21.56</span>
    <p>Subtotal: $${product.price}</p>
    <div class="cart-buttoms">
      <button onclick="disminuirStock(${product.id})">-</button>
      <p><span>1</span> unidad(es)</p>
      <button onclick="aumentarStock(${product.id})">+</button>
      <img onclick="deleteCartItem(${product.id})" class="cart-trash" src="./iconos/trash-solid.svg"></img>
    </div>
  </div>
  `
  cartContainer.appendChild(div);
  productsInCart.push(product);
  showTotal.innerHTML = totalPrice(productsInCart);
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  cartContainer.appendChild(div);
  spanItem.innerHTML = productsInCart.length;
}
