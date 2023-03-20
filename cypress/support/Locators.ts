export const Locators = {
  Header: {
    brand: ".navbar-brand",
    home: '[data-test="nav-home"]',
    categories: '[data-test="nav-categories"]',
    handTools: '[data-test="nav-hand-tools"]',
    powerTools: '[data-test="nav-power-tools"]',
    specialTools: '[data-test="nav-power-tools"]',
    rentals: '[data-test="nav-rentals"]',
    contact: '[data-test="nav-contact"]',
    signIn: '[data-test="nav-sign-in"]',
    cart: '[data-test="nav-cart"]',
    cartQuantity: '[data-test="cart-quantity"]',
  },

  ProductsGrid: {
    allContainers: "a.card",
    container: '[data-test="replaceWithID"]',
    image: "img",
    name: '[data-test="product-name"]',
    price: '[data-test="product-price"]',
    previousPage: ".pagination-previous > a",
    nextPage: ".pagination-next > a",
  },
}
