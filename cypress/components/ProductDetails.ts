import { Locators } from "@locators"

class ProductsDetails {
  public image(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.image)
  }

  public name(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.name)
  }

  public tags(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.pill)
  }

  public price(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.price)
  }

  public decrementQuantity(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.Quantity.decrement)
  }

  public quantityField(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.Quantity.field)
  }

  public incrementQuantity(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.Quantity.increment)
  }

  public addToCart(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.addToCart)
  }

  public addToFavorites(): Cypress.Chainable {
    return cy.get(Locators.ProductDetails.addToFavorites)
  }

  public verifyProductDetailsFacade(
    image: string,
    name: string,
    categoryName: string,
    brandName: string,
    price: number
  ): void {
    this.image()
      .should("be.visible")
      .should("have.attr", "src", `assets/img/products/${image}`)

    this.name().should("be.visible").should("contain.text", name)

    this.tags()
      .should("be.visible")
      .should("have.length", 2)
      .should("contain.text", categoryName)
      .should("contain.text", brandName)

    this.price().should("be.visible").should("contain.text", price)

    this.decrementQuantity().should("be.visible")
    this.quantityField().invoke("val").should("eq", `1`)
    this.incrementQuantity().should("be.visible")

    this.addToCart().should("be.visible")
    this.addToFavorites().should("be.visible")
  }
}

export default new ProductsDetails()
