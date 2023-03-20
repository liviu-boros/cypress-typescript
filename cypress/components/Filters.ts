import { Locators } from "../support/Locators"

class Filters {
  public sort(): Cypress.Chainable {
    return cy.get(Locators.Filters.sort)
  }

  public searchField(): Cypress.Chainable {
    return cy.get(Locators.Filters.searchField)
  }

  public searchReset(): Cypress.Chainable {
    return cy.get(Locators.Filters.searchReset)
  }

  public searchSubmit(): Cypress.Chainable {
    return cy.get(Locators.Filters.searchSubmit)
  }

  public categoryHammer(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.hammer)
  }

  public categoryHandSaw(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.handSaw)
  }

  public categoryWrench(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.wrench)
  }

  public categoryScrewdriver(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.screwdriver)
  }

  public categoryPliers(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.pliers)
  }

  public categoryGrinder(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.grinder)
  }

  public categorySander(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.sander)
  }

  public categorySaw(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.saw)
  }

  public categoryDrill(): Cypress.Chainable {
    return cy.get(Locators.Filters.Category.drill)
  }

  public brandName1(): Cypress.Chainable {
    return cy.get(Locators.Filters.Brand.brandName1)
  }

  public brandName2(): Cypress.Chainable {
    return cy.get(Locators.Filters.Brand.brandName2)
  }
}

export default new Filters()
