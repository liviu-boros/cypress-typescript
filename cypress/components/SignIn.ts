import { Locators } from "@locators"

class SignIn {
  public emailField(): Cypress.Chainable {
    return cy.get(Locators.SingIn.username)
  }

  public passwordField(): Cypress.Chainable {
    return cy.get(Locators.SingIn.password)
  }

  public loginButton(): Cypress.Chainable {
    return cy.get(Locators.SingIn.login)
  }

  public confirmationMessage(): Cypress.Chainable {
    return cy.get(Locators.SingIn.loginConfirmation)
  }

  public proceedToCheckout(): Cypress.Chainable {
    return cy.get(Locators.SingIn.proceedToCheckout)
  }

  public verifyConfirmationMessage(firstName: string, lastName: string): void {
    this.confirmationMessage()
      .should("be.visible")
      .should(
        "have.text",
        `Hello ${firstName} ${lastName}, you are already logged in. You can proceed to checkout.`
      )
  }
}
export default new SignIn()
