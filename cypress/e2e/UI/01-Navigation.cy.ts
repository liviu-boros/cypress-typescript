import Header from "../../components/Header"

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Header items should have the expected href", () => {
    Header.headerLogo().should("be.visible")

    Header.home().should("be.visible").should("have.attr", "href", "#")

    Header.categories().click()
    Header.handTools()
      .should("be.visible")
      .should("have.attr", "href", "#/category/hand-tools")
    Header.powerTools()
      .should("be.visible")
      .should("have.attr", "href", "#/category/power-tools")
    Header.rentals()
      .should("be.visible")
      .should("have.attr", "href", "#/rentals")
    Header.categories().click()

    Header.contact()
      .should("be.visible")
      .should("have.attr", "href", "#/contact")

    Header.singIn()
      .should("be.visible")
      .should("have.attr", "href", "#/auth/login")
  })

  it("Header items should navigate to the correct links", () => {
    Header.categories().click()
    Header.handTools().click()
    cy.url().should("contain", "/category/hand-tools")

    Header.categories().click()
    Header.powerTools().click()
    cy.url().should("contain", "/category/power-tools")

    Header.categories().click()
    Header.rentals().click()
    cy.url().should("contain", "/rentals")

    Header.contact().click()
    cy.url().should("contain", "/contact")

    Header.singIn().click()
    cy.url().should("contain", "/auth/login")

    Header.home().click()
    cy.url().should("contain", "#/")
  })
})
