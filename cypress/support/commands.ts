/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command for abstracting cy.request() with a GET method.
     *
     * @param {string} url - The URL to send the GET request to.
     * @returns {Cypress.Chainable<Cypress.Response<any>>} A chainable Cypress object containing the response data.
     */
    GET(url: string): Cypress.Chainable<Cypress.Response<any>>

    /**
     * Custom command for abstracting cy.request() with a POST method.
     *
     * @param {string} url - The URL to send the POST request to.
     * @param {object} body - The payload object to send with the request.
     * @returns {Cypress.Chainable<Cypress.Response<any>>} A chainable Cypress object containing the response data.
     */
    POST(url: string, body: object): Cypress.Chainable<Cypress.Response<any>>
  }
}

Cypress.Commands.add("GET", (url: string) => {
  return cy.request({
    method: "GET",
    url: url,
  })
})

Cypress.Commands.add("POST", (url: string, body) => {
  return cy.request({
    method: "POST",
    url: url,
    body: body,
  })
})
