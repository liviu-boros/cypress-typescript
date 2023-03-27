import { Locators } from "@locators"

class Address {
  public addressField(): Cypress.Chainable {
    return cy.get(Locators.Address.address)
  }

  public cityField(): Cypress.Chainable {
    return cy.get(Locators.Address.city)
  }

  public stateField(): Cypress.Chainable {
    return cy.get(Locators.Address.state)
  }

  public countryField(): Cypress.Chainable {
    return cy.get(Locators.Address.country)
  }

  public postcodeField(): Cypress.Chainable {
    return cy.get(Locators.Address.postcode)
  }

  public proceedToCheckout(): Cypress.Chainable {
    return cy.get(Locators.Address.proceedToCheckout)
  }
}
export default new Address()
