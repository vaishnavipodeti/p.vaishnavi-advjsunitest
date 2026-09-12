const API_URL = 'https://dummyjson.com/products?limit=20';
const PRICE_LIMIT = 500;

const boardEl = document.querySelector('#board');
const statusEl = document.querySelector('#status');
const summaryEl = document.querySelector('#summary');
const selectedCountEl = document.querySelector('#selected-count');
const filterEl = document.querySelector('#filter');
const retryEl = document.querySelector('#retry');

const state = {
  products: [],
  selected: new Set(),
};

/* ---------- provided helpers — no marks, do not change ---------- */

function setStatus(message) {
  statusEl.textContent = message;
  statusEl.hidden = !message;
}

function cardTemplate(product) {
  return `
    <article class="card" data-id="${product.id}">
      <h3>${product.title}</h3>
      <p>${product.category}</p>
      <strong>${product.price}</strong>
    </article>
  `;
}

function renderCards(products) {
  boardEl.innerHTML = products.map(cardTemplate).join('');
  state.selected.forEach((id) => {
    const card = boardEl.querySelector(`[data-id="${id}"]`);
    if (card) card.classList.add('selected');
  });
}

function render() {
  const visible = filterEl.checked
    ? minPrice(PRICE_LIMIT)(state.products)
    : state.products;

  renderCards(visible);
  summaryEl.textContent = summarise(visible);
  selectedCountEl.textContent = `Selected: ${state.selected.size}`;
}

/* ---------- your work starts here ---------- */

// TODO (req 2): a custom error class carrying the HTTP status
class ApiError extends Error {}

// TODO (req 5): curried and pure — minPrice(500)(products) returns a NEW array
const minPrice = (limit) => (products) => {};

// TODO (req 3): use reduce. Return a string like:
// "12 products · avg 342.50 · top: Laptop"
function summarise(products) {}

// TODO (req 1 + 2): loading state, res.ok check, throw ApiError,
// catch it, show a message, reveal the retry button, then render()
async function loadProducts() {}

// TODO (req 4): ONE delegated click listener on boardEl.
// Toggle .selected, update state.selected, keep the count in sync.

filterEl.addEventListener('change', render);
retryEl.addEventListener('click', loadProducts);

loadProducts();
