import { HelperCart } from "@HelperCart"
import { Locators } from "@locators"

class Cart {
  private _anchor: Cypress.Chainable

  public row(rowIndex): this {
    this._anchor = cy.get(Locators.Cart.row).eq(rowIndex).should("exist")
    return this
  }

  public nameCell(): Cypress.Chainable {
    return this._anchor.find(Locators.Cart.nameCell)
  }

  public quantityCell(): Cypress.Chainable {
    return this._anchor.find(Locators.Cart.quantityCell)
  }

  public priceCell(): Cypress.Chainable {
    return this._anchor.find(Locators.Cart.priceCell)
  }

  public totalCell(): Cypress.Chainable {
    return this._anchor.find(Locators.Cart.totalCell)
  }

  public removeItem(): Cypress.Chainable {
    return this._anchor.find(Locators.Cart.removeItem)
  }

  public totalCart(): Cypress.Chainable {
    return cy.get(Locators.Cart.totalCart)
  }

  public proceedToCheckout(): Cypress.Chainable {
    return cy.get(Locators.Cart.proceedToCheckout)
  }

  public verifyCartTable(helperCart: HelperCart): void {
    for (let product of helperCart.getCart()) {
      const rowIndex = helperCart.getCart().indexOf(product) + 1

      this.row(rowIndex).nameCell().should("have.text", product.name)
      this.row(rowIndex)
        .quantityCell()
        .invoke("val")
        .should("eq", `${helperCart.getProductQuantity(product)}`)
      this.row(rowIndex)
        .priceCell()
        .should("have.text", `$${product.price.toFixed(2)}`)
      this.row(rowIndex)
        .totalCell()
        .should("have.text", `$${helperCart.getTotalProductPrice(product)}`)
      this.row(rowIndex).removeItem().should("be.visible")
    }
    this.totalCart().should("contain.text", `$${helperCart.getTotalPrice()}`)
  }
}

export default new Cart()
