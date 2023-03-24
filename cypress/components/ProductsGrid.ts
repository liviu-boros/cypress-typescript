import { Locators } from "../support/Locators"

class ProductsGrid {
  private _anchor: Cypress.Chainable

  public allCards(): Cypress.Chainable {
    return cy.get(Locators.ProductsGrid.allContainers)
  }

  public productCard(id: number): this {
    this._anchor = cy
      .get(
        Locators.ProductsGrid.container.replace(
          "replaceWithID",
          `product-${id}`
        )
      )
      .should("exist")
      .should("be.visible")
    return this
  }

  public productImage(): Cypress.Chainable {
    return this._anchor.find(Locators.ProductsGrid.image)
  }

  public productName(): Cypress.Chainable {
    return this._anchor.find(Locators.ProductsGrid.name)
  }

  public productPrice(): Cypress.Chainable {
    return this._anchor.find(Locators.ProductsGrid.price)
  }

  public previousPage(): Cypress.Chainable {
    return cy.get(Locators.ProductsGrid.previousPage)
  }

  public nextPage(): Cypress.Chainable {
    return cy.get(Locators.ProductsGrid.nextPage)
  }

  // facades
  public verifyProductFacade(
    id: number,
    image: string,
    name: string,
    price: number
  ): void {
    this.productCard(id)
      .productImage()
      .should("be.visible")
      .should("have.attr", "src", `assets/img/products/${image}`)

    this.productCard(id)
      .productName()
      .should("be.visible")
      .should("contain.text", name)

    this.productCard(id)
      .productPrice()
      .should("be.visible")
      .should("contain.text", price)
  }
}

export default new ProductsGrid()
