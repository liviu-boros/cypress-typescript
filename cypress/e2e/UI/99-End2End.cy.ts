import { Data } from "../../support/Data"
import Header from "../../components/Header"
import ProductsGrid from "../../components/ProductsGrid"
import ProductDetails from "../../components/ProductDetails"
import Cart from "../../components/Cart"
import { HelperCart } from "../../support/HelperCart"
import { paginateProducts, selectRandom } from "../../support/Utils"
import Filters from "../../components/Filters"

describe("e2e - Add to cart", () => {
  let helperCart

  beforeEach(() => {
    cy.visit("/")
    helperCart = new HelperCart()
  })

  it("Add first product to cart and verify cart", () => {
    const firstProduct = [...Data.Products][0]

    ProductsGrid.productCard(firstProduct.id).productName().click()

    cy.url().should("contain", `/product/${firstProduct.id}`)
    ProductDetails.addToCart().click()
    helperCart.addProduct(firstProduct)
    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 1)

    Header.cart().click()

    // !
    // ! abstracted in Cart.verifyCartTable
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

  it("Add random product to cart 3 times and verify cart", () => {
    const randomProduct = selectRandom(Data.Products)

    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()

    ProductsGrid.productCard(randomProduct.id).productName().click()

    cy.url().should("contain", `/product/${randomProduct.id}`)
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)
    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 3)

    Header.cart().click()

    Cart.verifyCartTable(helperCart)
  })

  //
  // test can deal with adding the same item several times
  // and with adding 3 different items
  it("Add 3 random products to cart and verify cart", () => {
    const firstPageProducts = paginateProducts(Data.Products, 1)
    const randomProduct1 = selectRandom(firstPageProducts)
    const randomProduct2 = selectRandom(firstPageProducts)
    const randomProduct3 = selectRandom(firstPageProducts)

    //
    // Add first random product to cart
    ProductsGrid.productCard(randomProduct1.id).productName().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct1)

    Header.cart().should("be.visible")
    Header.cartQuantity().should("be.visible").should("have.text", 1)

    //
    // Go back to home screen and add second random product to cart
    Header.home().click()

    ProductsGrid.productCard(randomProduct2.id).productName().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct2)

    Header.cartQuantity().should("be.visible").should("have.text", 2)

    //
    // Go back to home screen and add third random product to cart
    Header.home().click()

    ProductsGrid.productCard(randomProduct3.id).productName().click()
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct3)

    Header.cartQuantity().should("be.visible").should("have.text", 3)

    //
    // Go to cart screen and verify cart data
    Header.cart().click()
    Cart.verifyCartTable(helperCart)
  })
})
