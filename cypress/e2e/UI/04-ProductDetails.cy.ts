import { Data } from "@data"
import ProductsGrid from "@components/ProductsGrid"
import ProductDetails from "@components/ProductDetails"
import { selectRandom } from "@utilies"
import Header from "@components/Header"
import Filters from "@components/Filters"

describe("Product Details", () => {
  // visit home page
  beforeEach(() => {
    cy.visit("/")
  })

  it("First product details are displayed as expected", () => {
    // select first product from pre-defined list of products
    const firstProduct = Data.Products[0]
    const { id, image, name, category, brand, price } = firstProduct

    // click on product name to navigate to the product details page
    ProductsGrid.productCard(id).productName().click()

    // verify url
    cy.url().should("contain", `/product/${id}`)

    // verify contents of the product details
    // checking its image, name, price, quantity and buttons
    // ! abstracted to ProductDetails.verifyProductDetails
    ProductDetails.image()
      .should("be.visible")
      .should("have.attr", "src", `assets/img/products/${image}`)

    ProductDetails.name().should("be.visible").should("contain.text", name)

    ProductDetails.tags()
      .should("be.visible")
      .should("have.length", 2)
      .should("contain.text", category.name)
      .should("contain.text", brand.name)

    ProductDetails.price().should("be.visible").should("contain.text", price)

    ProductDetails.decrementQuantity().should("be.visible")
    ProductDetails.quantityField().invoke("val").should("eq", `1`)
    ProductDetails.incrementQuantity().should("be.visible")

    ProductDetails.addToCart().should("be.visible")
    ProductDetails.addToFavorites().should("be.visible")

    ProductDetails.incrementQuantity().click()
    ProductDetails.quantityField().invoke("val").should("eq", `2`)
    ProductDetails.incrementQuantity().click()
    ProductDetails.quantityField().invoke("val").should("eq", `3`)
    ProductDetails.decrementQuantity().click()
    ProductDetails.quantityField().invoke("val").should("eq", `2`)
    ProductDetails.decrementQuantity().click()
    ProductDetails.quantityField().invoke("val").should("eq", `1`)
  })

  it("3 Random products details are displayed as expected", () => {
    // select 3 random products from pre-defined list of products
    const randomProduct1 = selectRandom(Data.Products)
    const randomProduct2 = selectRandom(Data.Products)
    const randomProduct3 = selectRandom(Data.Products)

    // search for product1 by name
    // click on product1 name to navigate to the product details page
    Filters.searchField().clear().type(randomProduct1.name)
    Filters.searchSubmit().click()
    ProductsGrid.productCard(randomProduct1.id).productName().click()

    // verify url
    cy.url().should("contain", `/product/${randomProduct1.id}`)

    // verify contents of product1 details
    ProductDetails.verifyProductDetailsFacade(
      randomProduct1.image,
      randomProduct1.name,
      randomProduct1.category.name,
      randomProduct1.brand.name,
      randomProduct1.price
    )

    // search for product2 by name
    // click on product2 name to navigate to the product details page
    Header.home().click()
    Filters.searchField().clear().type(randomProduct2.name)
    Filters.searchSubmit().click()
    ProductsGrid.productCard(randomProduct2.id).productName().click()

    // verify url
    cy.url().should("contain", `/product/${randomProduct2.id}`)

    // verify contents of product2 details
    ProductDetails.verifyProductDetailsFacade(
      randomProduct2.image,
      randomProduct2.name,
      randomProduct2.category.name,
      randomProduct2.brand.name,
      randomProduct2.price
    )

    // search for product3 by name
    // click on product3 name to navigate to the product details page
    Header.home().click()
    Filters.searchField().clear().type(randomProduct3.name)
    Filters.searchSubmit().click()
    ProductsGrid.productCard(randomProduct3.id).productName().click()

    // verify url
    cy.url().should("contain", `/product/${randomProduct3.id}`)

    // verify contents of product3 details
    ProductDetails.verifyProductDetailsFacade(
      randomProduct3.image,
      randomProduct3.name,
      randomProduct3.category.name,
      randomProduct3.brand.name,
      randomProduct3.price
    )
  })
})
