import { Data } from "@data"
import Header from "@components/Header"
import ProductsGrid from "@components/ProductsGrid"
import ProductDetails from "@components/ProductDetails"
import Cart from "@components/Cart"
import { HelperCart } from "@HelperCart"
import { selectRandom } from "@utilies"
import Filters from "@components/Filters"

describe("Cart", () => {
  let helperCart

  // visit home page
  // create a new HelperCart object before each test
  // intercept search request as alias
  beforeEach(() => {
    cy.visit("/")
    helperCart = new HelperCart()
    cy.intercept("GET", "**/products/search**").as("GETsearch")
  })

  it("Add first product to cart and verify cart", () => {
    // select first product from pre-defined list of products
    const firstProduct = [...Data.Products][0]

    // click on product name to navigate to the product details page
    ProductsGrid.productCard(firstProduct.id).productName().click()

    // add product to cart
    // add product to helperCart to keep track of cart internally
    ProductDetails.addToCart().click()
    helperCart.addProduct(firstProduct)

    // verify cart icon and cart quantity
    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 1)

    // click on cart icon to navigate to cart page
    Header.cart().click()

    // verify contents of the cart table by iterating over each product
    // and checking its name, quantity, price, and total
    // ! abstracted to Cart.verifyCartTable in later tests
    for (let product of helperCart.getCart()) {
      const rowIndex = helperCart.getCart().indexOf(product) + 1

      Cart.row(rowIndex).nameCell().should("have.text", product.name)
      Cart.row(rowIndex)
        .quantityCell()
        .invoke("val")
        .should("eq", `${helperCart.getProductQuantity(product)}`)
      Cart.row(rowIndex).priceCell().should("have.text", `$${product.price}`)
      Cart.row(rowIndex)
        .totalCell()
        .should("have.text", `$${helperCart.getTotalProductPrice(product)}`)
      Cart.row(rowIndex).removeItem().should("be.visible")
    }
    Cart.totalCart().should("contain.text", `$${helperCart.getTotalPrice()}`)
  })

  it("Add and remove a random product and verify cart is empty", () => {
    // select a random product from pre-defined list of products
    const randomProduct = selectRandom(Data.Products)

    // search for product by name
    // click on product name to navigate to the product details page
    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct.id).productName().click()

    // add product to cart
    // add product to helperCart to keep track of cart internally
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)

    // verify cart icon and cart quantity
    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 1)

    // verify the contents of the cart table by iterating over each product
    // and checking its name, quantity, price, and total
    Header.cart().click()
    Cart.verifyCartTable(helperCart)

    // remove product from the cart
    Cart.row(1).removeItem().should("be.visible").click()
    Cart.totalCart().should("contain.text", `$0.00`)

    // verify cart icon and cart quantity
    Header.cart().should("not.exist")
    Header.cartQuantity().should("not.exist")
  })

  it("Add random product to cart 3 times and verify cart", () => {
    // select a random product from pre-defined list of products
    const randomProduct = selectRandom(Data.Products)

    // search for product by name
    // click on product name to navigate to the product details page
    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct.id).productName().click()

    // add product to cart 3 times
    // add product to helperCart to keep track of cart internally
    ProductDetails.addToCart().click()
    ProductDetails.addToCart().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)
    helperCart.addProduct(randomProduct)
    helperCart.addProduct(randomProduct)

    // verify cart icon and cart quantity
    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 3)

    // verify the contents of the cart table by iterating over each product
    // and checking its name, quantity, price, and total
    Header.cart().click()
    Cart.verifyCartTable(helperCart)
  })

  it("Add and remove 3 distinct random products times and verify cart after each removal", () => {
    // select 3 distinct random products from pre-defined list of products
    const randomProducts = []
    while (randomProducts.length < 3) {
      const randomProduct = selectRandom(Data.Products)
      if (!randomProducts.includes(randomProduct)) {
        randomProducts.push(randomProduct)
      }
    }
    const [randomProduct1, randomProduct2, randomProduct3] = randomProducts

    // > product1
    // search for product by name
    // click on product name to navigate to the product details page
    Filters.searchField().clear().type(randomProduct1.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct1.id).productName().click()

    // add product to cart
    // add product to helperCart to keep track of cart internally
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct1)

    // > product2
    // search for product by name
    // click on product name to navigate to the product details page
    Header.home().click()
    Filters.searchField().clear().type(randomProduct2.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct2.id).productName().click()

    // add product to cart
    // add product to helperCart to keep track of cart internally
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct2)

    // > product3
    // search for product by name
    // click on product name to navigate to the product details page
    Header.home().click()
    Filters.searchField().clear().type(randomProduct3.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct3.id).productName().click()

    // add product to cart
    // add product to helperCart to keep track of cart internally
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct3)

    // remove each product one by one
    // verify the contents of the cart table by iterating over each product
    // and checking its name, quantity, price, and total
    Header.cart().click()
    Cart.verifyCartTable(helperCart)
    // > product3
    Cart.row(3).removeItem().should("be.visible").click()
    helperCart.removeProduct(randomProduct3)
    Cart.verifyCartTable(helperCart)
    // > product2
    Cart.row(2).removeItem().should("be.visible").click()
    helperCart.removeProduct(randomProduct2)
    Cart.verifyCartTable(helperCart)
    // > product1
    Cart.row(1).removeItem().should("be.visible").click()
    helperCart.removeProduct(randomProduct1)
    Cart.totalCart().should("contain.text", `$0.00`)
  })

  // test can deal with adding the same item several times
  // and with adding 3 different items
  it("Add 3 random products to cart and verify cart", () => {
    // select 3 random products from pre-defined list of products
    const randomProduct1 = selectRandom(Data.Products)
    const randomProduct2 = selectRandom(Data.Products)
    const randomProduct3 = selectRandom(Data.Products)

    // search for product1 by name
    // add product1 to cart
    Filters.searchField().clear().type(randomProduct1.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct1.id).productName().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct1)

    // verify cart icon and cart quantity
    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 1)

    // search for product2 by name
    // add product2 to cart
    Header.home().click()
    Filters.searchField().clear().type(randomProduct2.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct2.id).productName().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct2)

    // verify cart quantity
    Header.cartQuantity().should("be.visible").should("have.text", 2)

    // Go back to home screen
    // and add third random product to cart
    Header.home().click()
    Filters.searchField().clear().type(randomProduct3.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct3.id).productName().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct3)

    // verify cart quantity
    Header.cartQuantity().should("be.visible").should("have.text", 3)

    // verify contents of the cart table by iterating over each product
    // and checking its name, quantity, price, and total
    Header.cart().click()
    Cart.verifyCartTable(helperCart)
  })
})
