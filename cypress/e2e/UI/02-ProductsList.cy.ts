import { Data } from "@data"
import ProductsGrid from "@components/ProductsGrid"
import { selectRandom, paginateProducts } from "@utilies"

describe("Products", () => {
  // visit home page
  beforeEach(() => {
    cy.visit("/")
  })

  it("Randomly picked product from the first page is displayed as expected", () => {
    // select a random product from the first page
    const firstPageProducts = paginateProducts(Data.Products, 1)
    const randomProduct = selectRandom(firstPageProducts)
    const { id, image, name, price } = randomProduct

    // verify product card
    // checking its id, image, name and price
    // ! abstracted to ProductsGrid.verifyProduct
    ProductsGrid.productCard(id)
      .productImage()
      .should("be.visible")
      .should("have.attr", "src", `assets/img/products/${image}`)
    ProductsGrid.productCard(id)
      .productName()
      .should("be.visible")
      .should("contain.text", name)
    ProductsGrid.productCard(id)
      .productPrice()
      .should("be.visible")
      .should("contain.text", price)
  })

  it("All products on all pages are displayed as expected", () => {
    // create list of products for each page
    const firstPageProducts = paginateProducts(Data.Products, 1)
    const secondPageProducts = paginateProducts(Data.Products, 2)
    const thirdPageProducts = paginateProducts(Data.Products, 3)

    // verify products grid
    // first page products
    for (let product of firstPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }

    // verify products grid
    // second page products
    ProductsGrid.nextPage().click()
    for (let product of secondPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }

    // verify products grid
    // third page products
    ProductsGrid.nextPage().click()
    for (let product of thirdPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
  })
})
