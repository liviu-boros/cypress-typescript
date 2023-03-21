import { Data } from "../../support/Data"
import ProductsGrid from "../../components/ProductsGrid"
import ProductDetails from "../../components/ProductDetails"
import { paginateProducts, selectRandom } from "../../support/Utils"
import Header from "../../components/Header"

describe("Product Details", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("First product details are displayed as expected", () => {
    const firstProduct = [...Data.Products][0]
    const { id, image, name, category, brand, price } = firstProduct

    ProductsGrid.productCard(id).productName().click()

    cy.url().should("contain", `/product/${id}`)

    // !
    // ! abstracted in ProductDetails.verifyProductDetailsFacade
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

  it.only("3 Random products details are displayed as expected", () => {
    const firstPageProducts = paginateProducts(Data.Products, 1)
    const randomProduct1 = selectRandom(firstPageProducts)
    const randomProduct2 = selectRandom(firstPageProducts)
    const randomProduct3 = selectRandom(firstPageProducts)

    //
    // verify first random product details
    ProductsGrid.productCard(randomProduct1.id).productName().click()
    cy.url().should("contain", `/product/${randomProduct1.id}`)
    ProductDetails.verifyProductDetailsFacade(
      randomProduct1.image,
      randomProduct1.name,
      randomProduct1.category.name,
      randomProduct1.brand.name,
      randomProduct1.price
    )

    //
    // verify second random product details
    Header.home().click()
    ProductsGrid.productCard(randomProduct2.id).productName().click()
    cy.url().should("contain", `/product/${randomProduct2.id}`)
    ProductDetails.verifyProductDetailsFacade(
      randomProduct2.image,
      randomProduct2.name,
      randomProduct2.category.name,
      randomProduct2.brand.name,
      randomProduct2.price
    )

    //
    // verify third random product details
    Header.home().click()
    ProductsGrid.productCard(randomProduct3.id).productName().click()
    cy.url().should("contain", `/product/${randomProduct3.id}`)
    ProductDetails.verifyProductDetailsFacade(
      randomProduct3.image,
      randomProduct3.name,
      randomProduct3.category.name,
      randomProduct3.brand.name,
      randomProduct3.price
    )
  })
})
