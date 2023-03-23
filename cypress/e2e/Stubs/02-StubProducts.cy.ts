import ProductsGrid from "@components/ProductsGrid"

describe("Products stubs", () => {
  beforeEach(() => {})

  it("Stub Products list with blank list and verify UI", () => {
    cy.intercept("GET", `/products?page=1`, { fixture: "NoProducts.json" })

    cy.visit("/")
    ProductsGrid.allCards().should("not.exist")
  })

  it("Stub Products list with different products and verify UI", () => {
    cy.intercept("GET", `/products?page=1`, { fixture: "ProductsPage1.json" })

    cy.visit("/")
    ProductsGrid.allCards().should("have.length", 3)
    cy.fixture("ProductsPage1.json").then((stubbedProduct) => {
      for (let product of stubbedProduct.data) {
        const { id, product_image, name, price } = product
        ProductsGrid.verifyProductFacade(
          id,
          product_image.file_name,
          name,
          price
        )
      }
    })
  })
})
