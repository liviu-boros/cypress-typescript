import ProductDetails from "../../components/ProductDetails"
import ProductsGrid from "../../components/ProductsGrid"

describe("Products stubs", () => {
  beforeEach(() => {})

  it("Stub Product description and verify UI", () => {
    cy.intercept("GET", `/products/1`, { fixture: "Product.json" })

    cy.fixture("Product.json").then((stubbedProduct) => {
      cy.visit("/")
      ProductsGrid.productCard(stubbedProduct.id).productName().click()
      ProductDetails.verifyProductDetailsFacade(
        stubbedProduct.product_image.file_name,
        stubbedProduct.name,
        stubbedProduct.category.name,
        stubbedProduct.brand.name,
        stubbedProduct.price
      )
    })
  })
})
