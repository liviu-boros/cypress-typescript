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

  Filters: {
    sort: '[data-test="sort"]',

    PriceSlider: {
      container: ".ngx-slider.animate",
      minPointer: ".ngx-slider-pointer-min",
      maxPointer: ".ngx-slider-pointer-max",
    },

    searchField: '[data-test="search-query"]',
    searchReset: '[data-test="search-reset"]',
    searchSubmit: '[data-test="search-submit"]',

    Category: {
      hammer: '[data-test="category-3"]',
      handSaw: '[data-test="category-4"]',
      wrench: '[data-test="category-5"]',
      screwdriver: '[data-test="category-6"]',
      pliers: '[data-test="category-7"]',
      grinder: '[data-test="category-8"]',
      sander: '[data-test="category-9"]',
      saw: '[data-test="category-10"]',
      drill: '[data-test="category-11"]',
    },

    Brand: {
      brandName1: '[data-test="brand-1"]',
      brandName2: '[data-test="brand-2"]',
    },
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
