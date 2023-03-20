import { Data } from "../../support/Data"
import ProductsGrid from "../../components/ProductsGrid"
import { randomizeProduct, paginateProducts } from "../../support/Utils"

describe("Products", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Randomly picked product from the first page is displayed as expected", () => {
    // select a random product from the first page
    const firstPageProducts = paginateProducts(Data.Products, 1)
    const randomProduct = randomizeProduct(firstPageProducts)

    ProductsGrid.productCard(randomProduct.id)
      .productImage()
      .should("be.visible")
      .should("have.attr", "src", randomProduct.image)

    ProductsGrid.productCard(randomProduct.id)
      .productName()
      .should("be.visible")
      .should("contain.text", randomProduct.name)

    ProductsGrid.productCard(randomProduct.id)
      .productPrice()
      .should("be.visible")
      .should("contain.text", randomProduct.price)
  })

  it("All products on all pages are displayed as expected", () => {
    // create list of products for each page
    const firstPageProducts = paginateProducts(Data.Products, 1)
    const secondPageProducts = paginateProducts(Data.Products, 2)
    const thirdPageProducts = paginateProducts(Data.Products, 3)

    //
    // first page products
    for (let product of firstPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }

    //
    // second page products
    ProductsGrid.nextPage().click()
    for (let product of secondPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }

    //
    // third page products
    ProductsGrid.nextPage().click()
    for (let product of thirdPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
  })
})
