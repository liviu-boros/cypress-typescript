import { Locators } from "@locators"

class Payment {
  public paymentMethod(): Cypress.Chainable {
    return cy.get(Locators.Payment.paymentMethod)
  }

  public accountNameField(): Cypress.Chainable {
    return cy.get(Locators.Payment.accountName)
  }

  public accountNumberField(): Cypress.Chainable {
    return cy.get(Locators.Payment.accountNumber)
  }

  public confirm(): Cypress.Chainable {
    return cy.get(Locators.Payment.confirm)
  }

  public confirmationMessage(): Cypress.Chainable {
    return cy.get(Locators.Payment.confirmationMessage)
  }
}
export default new Payment()
