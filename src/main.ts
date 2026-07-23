import "./style.css";

import { products } from "./products";
import { cart } from "./cart";

/* Personas */
const peopleCount = document.querySelector("#people-count")!;
document
  .querySelector("#people-minus")
  ?.addEventListener("click", () => {
    let value = parseInt(peopleCount.textContent || "4");
    if (value > 1) {
      value--;
      peopleCount.textContent = value.toString();
    }
  });

document
  .querySelector("#people-plus")
  ?.addEventListener("click", () => {
    let value = parseInt(peopleCount.textContent || "4");
    if (value < 8) {
      value++;
      peopleCount.textContent = value.toString();
    }
  });

const container =
  document.querySelector("#products")!;

products.forEach(product => {

  let quantity = 1;

  const card = document.createElement("div");

  card.className =
    "bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800";

  card.innerHTML = `
    <img
      src="${product.image}"
      class="w-full h-56 object-cover"
    >

    <div class="p-5">

      <h2 class="text-center text-xl font-bold mb-4">
        ${product.name}
      </h2>

      <div class="flex justify-between gap-4">

        <div class="space-y-3">

          <div>

            <p class="text-zinc-400 text-sm">
              Unidades
            </p>

            <div class="flex gap-2 items-center mt-1">

              <button class="minus w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
                -
              </button>

              <span class="qty">
                1
              </span>

              <button class="plus w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
                +
              </button>

            </div>

          </div>

          <div>
            <p class="text-zinc-400 text-sm">
              Precio/u
            </p>

            <p>
              ARS$ ${product.price.toLocaleString()}
            </p>
          </div>

          <div>
            <p class="text-zinc-400 text-sm">
              Porciones/u
            </p>

            <p class="portions">
              ${product.portionsPerUnit}
            </p>
          </div>

        </div>

        <div class="flex items-center">

          <button class="add-cart bg-green-600 hover:bg-green-500 px-4 py-3 rounded-xl">
            Agregar
          </button>

        </div>

      </div>

    </div>
  `;

  const qty =
    card.querySelector(".qty")!;

  const plus =
    card.querySelector(".plus")!;

  const minus =
    card.querySelector(".minus")!;

  plus.addEventListener("click", () => {
    if (quantity < 8) {
      quantity++;
      qty.textContent = quantity.toString();
    }
  });

  minus.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qty.textContent = quantity.toString();
    }
  });

  card
    .querySelector(".add-cart")!
    .addEventListener("click", () => {

      const existing =
        cart.find(
          item => item.id === product.id
        );

      if (existing) {

        existing.quantity += quantity;

        existing.total +=
          quantity * product.price;

        existing.portions +=
          quantity *
          product.portionsPerUnit;

      } else {

        cart.push({
          id: product.id,
          name: product.name,
          quantity,
          total:
            quantity *
            product.price,
          portions:
            quantity *
            product.portionsPerUnit
        });
      }

      updateCart();
    });

  container.appendChild(card);
});

/* Actualizar carrito */
function updateCart() {

  const cartItems =
    document.querySelector("#cart-items")!;

  cartItems.innerHTML = "";

  let total = 0;
  let portions = 0;
  let peopleCount = document.querySelector("#people-count")!;

  cart.forEach(item => {

    total += item.total;
    portions += item.portions;

    cartItems.innerHTML += `
      <div
        class="bg-zinc-800 rounded-xl p-3 flex justify-between">
        <div>
          <p>${item.name}</p>

          <p class="text-xs text-zinc-400">
            x${item.quantity}
          </p>
        </div>

        <p>
          ARS$ ${item.total.toLocaleString()}
        </p>
      </div>
    `;
  });

  (
    document.querySelector("#cart-total")!
  ).textContent =
  `ARS$ ${total.toLocaleString()}`;
  
  (
    document.querySelector("#cart-total-portions")!
  ).textContent =
    portions.toString();

  (
    document.querySelector("#cart-people")!
  ).textContent =
    "Comidas para "+parseInt(peopleCount.textContent || "4").toString()+" persona(s)";

  (
    document.querySelector("#cart-portions")!
  ).textContent =
    (portions/parseInt(peopleCount.textContent || "4")/2).toString();

  (
    document.querySelector("#cart-durability")!
  ).textContent =
    (portions/parseInt(peopleCount.textContent || "4")/4).toString();
}

/* Mostrar/Ocultar carrito */
document
  .querySelector("#toggle-cart")!
  .addEventListener("click", () => {

    document
      .querySelector("#cart-content")!
      .classList.toggle("hidden");

  });


/* Limpiar carrito */
document
  .querySelector("#clear-cart")
  ?.addEventListener("click", () => {

    cart.length = 0;

    updateCart();

  });
