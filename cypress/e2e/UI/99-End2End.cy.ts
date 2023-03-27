import { Data } from "@data"
import { HelperCart } from "@HelperCart"
import { selectRandom } from "@utilies"
import Header from "@components/Header"
import ProductsGrid from "@components/ProductsGrid"
import ProductDetails from "@components/ProductDetails"
import Cart from "@components/Cart"
import Filters from "@components/Filters"
import SignIn from "@components/SignIn"
import Address from "@components/Address"
import Payment from "@components/Payment"
const apiUrl = Cypress.env("baseAPI")

describe("End to end - UI login", () => {
  let helperCart

  // visit home page
  // create a new HelperCart object before each test
  // intercept search request as alias
  beforeEach(() => {
    helperCart = new HelperCart()
    cy.intercept("GET", "**/products/search**").as("GETsearch")
    cy.visit("/")
  })

  it("should be able to order a random item", () => {
    // -- initialize data --
    const randomProduct = selectRandom(Data.Products)
    const Pay = Data.Payment.CashOnDelivery
    const {
      first_name: firstName,
      last_name: lastName,
      address,
      city,
      state,
      country,
      postcode,
      email,
      password,
    } = Data.Users[0]

    // -- search and select product --
    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct.id).productName().click()

    // -- add product to cart --
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)

    // -- verify cart --
    Header.cart().click()
    Cart.verifyCartTable(helperCart)
    Cart.proceedToCheckout().click()

    // -- sign in --
    SignIn.emailField().clear().type(email)
    SignIn.passwordField().clear().type(password)
    SignIn.loginButton().click()
    SignIn.verifyConfirmationMessage(firstName, lastName)
    SignIn.proceedToCheckout().click()

    // -- address --
    Address.addressField().clear().type(address)
    Address.cityField().clear().type(city)
    Address.stateField().clear().type(state)
    Address.countryField().clear().type(country)
    Address.postcodeField().type(postcode)
    Address.proceedToCheckout().click()

    // -- payment --
    Payment.paymentMethod().select(Pay.option)
    Payment.accountNameField().type(Pay.accountName)
    Payment.accountNumberField().type(Pay.accountNumber)
    Payment.confirm().click()
    Payment.confirmationMessage().should("have.text", "Payment was successful")
  })
})

describe("End to end - backend login and stubbed user details", () => {
  let helperCart

  beforeEach(() => {
    // intialize data for requests
    const { password, ...user } = Data.Users[0]
    const postBody = { email: user.email, password }
    let token: string
    // create a new HelperCart object
    helperCart = new HelperCart()

    // intercept search request as alias
    cy.intercept("GET", "**/products/search**").as("GETsearch")

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

  it("should be able to order a random item", () => {
    // -- initialize data --
    const randomProduct = selectRandom(Data.Products)
    const { first_name: firstName, last_name: lastName } = Data.Users[0]
    const { CashOnDelivery: Pay, successMessage } = Data.Payment

    // -- search and select product --
    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()
    cy.wait("@GETsearch")
    ProductsGrid.productCard(randomProduct.id).productName().click()

    // -- add product to cart --
    ProductDetails.addToCart().click()
    helperCart.addProduct(randomProduct)

    // -- verify cart --
    Header.cart().click()
    Cart.verifyCartTable(helperCart)
    Cart.proceedToCheckout().click()

    // -- already singed in --
    SignIn.verifyConfirmationMessage(firstName, lastName)
    SignIn.proceedToCheckout().click()

    // -- address autofilled from stub --
    Address.proceedToCheckout().click()

    // -- payment --
    Payment.paymentMethod().select(Pay.option)
    Payment.accountNameField().type(Pay.accountName)
    Payment.accountNumberField().type(Pay.accountNumber)
    Payment.confirm().click()
    Payment.confirmationMessage().should("have.text", successMessage)
  })
})
