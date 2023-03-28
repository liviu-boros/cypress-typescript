import { Data } from "@data"
import ProductsGrid from "@components/ProductsGrid"
import ProductDetails from "@components/ProductDetails"
import { selectRandom } from "@utilies"
import Header from "@components/Header"
import Filters from "@components/Filters"
import SignIn from "@components/SignIn"
import Cart from "@components/Cart"
const apiUrl = Cypress.env("baseAPI")

describe("User sign in", () => {
  // visit home page
  // intercept search request as alias
  beforeEach(() => {
    cy.visit("/")
    cy.intercept("GET", "**/products/search**").as("GETsearch")
  })

  it("User is able to sign in and sign out from Homepage", () => {
    // select user to sing in from pre-defined list of users
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = Data.Users[0]

    // verify header
    Header.user().should("not.exist")
    Header.singIn().should("be.visible")

    // navigate to sign in form
    Header.singIn().click()
    cy.url().should("contain", "/auth/login")

    // fill in user data and sign in
    SignIn.emailField().clear().type(email)
    SignIn.passwordField().clear().type(password)
    SignIn.loginButton().click()
    cy.url().should("contain", "/account")

    // verify header
    Header.singIn().should("not.exist")
    Header.user().should("be.visible")
    Header.user().should("have.text", ` ${firstName} ${lastName} `)

    // sign out
    Header.user().click()
    Header.signOut().click()
    cy.url().should("contain", "/auth/login")
  })

  it("User is able to sign in while ordering", () => {
    // select a random product from pre-defined list of products
    // select user to sing in from pre-defined list of users
    const randomProduct = selectRandom(Data.Products)
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = Data.Users[0]

    // verify header
    Header.user().should("not.exist")
    Header.singIn().should("be.visible")

    // search for product by name
    // click on product name to navigate to the product details page
    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct.id).productName().click()

    // add product to cart
    ProductDetails.addToCart().click()

    // click on cart icon to navigate to cart page
    Header.cart().click()
    Cart.proceedToCheckout().click()

    SignIn.emailField().clear().type(email)
    SignIn.passwordField().clear().type(password)
    SignIn.loginButton().click()
    SignIn.verifyConfirmationMessage(firstName, lastName)
    SignIn.proceedToCheckout().should("be.enabled")

    // verify header
    Header.singIn().should("not.exist")
    Header.user().should("be.visible")
    Header.user().should("have.text", ` ${firstName} ${lastName} `)
  })
})

describe("User sign in - backend", () => {
  let helperCart

  beforeEach(() => {
    // intialize data for requests
    const { password, ...user } = Data.Users[0]
    const postBody = { email: user.email, password }
    let token: string

    // POST login, retrieve bearer token
    cy.POST(`${apiUrl}/users/login`, postBody).then((response) => {
      token = response.body.access_token
    })

    // intercept GET user with bearer token and user payload
    cy.intercept("GET", "**/users/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: user,
    })

    // set auth-token key in browser session storage
    cy.window().then((win) => {
      cy.wrap(win.sessionStorage).invoke("setItem", "auth-token", token)
    })

    // visit home page
    cy.visit("/")
  })

  it("User is already signed in", () => {
    // select user to sing in from pre-defined list of users
    const { first_name: firstName, last_name: lastName } = Data.Users[0]

    // verify header
    Header.user().should("be.visible")
    Header.singIn().should("not.exist")
    Header.user().should("have.text", ` ${firstName} ${lastName} `)
  })
})
