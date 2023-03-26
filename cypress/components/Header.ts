import { Locators } from "../support/Locators"

class Header {
  public headerLogo(): Cypress.Chainable {
    return cy.get(Locators.Header.brand)
  }

  public home(): Cypress.Chainable {
    return cy.get(Locators.Header.home)
  }

  public categories(): Cypress.Chainable {
    return cy.get(Locators.Header.categories)
  }

  public handTools(): Cypress.Chainable {
    return cy.get(Locators.Header.handTools)
  }

  public powerTools(): Cypress.Chainable {
    return cy.get(Locators.Header.powerTools)
  }

  public specialTools(): Cypress.Chainable {
    return cy.get(Locators.Header.specialTools)
  }

  public rentals(): Cypress.Chainable {
    return cy.get(Locators.Header.rentals)
  }

  public contact(): Cypress.Chainable {
    return cy.get(Locators.Header.contact)
  }

  public singIn(): Cypress.Chainable {
    return cy.get(Locators.Header.signIn)
  }

  public user(): Cypress.Chainable {
    return cy.get(Locators.Header.user)
  }

  public signOut(): Cypress.Chainable {
    return cy.get(Locators.Header.signOut)
  }

  public cart(): Cypress.Chainable {
    return cy.get(Locators.Header.cart)
  }

  public cartQuantity(): Cypress.Chainable {
    return cy.get(Locators.Header.cartQuantity)
  }
}

export default new Header()
