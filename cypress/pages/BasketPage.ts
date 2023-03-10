import Locators from "../locators/Locators"

class BasketPage {
  public assertURLContains(label: string): this {
    Locators.findURL().should("contain", label)
    return this
  }

  public assertTotalRow(label: string, value: string): this {
    Locators.findTotalRow(label).should("have.text", value).should("be.visible")
    return this
  }

  public selectProceedToCheckout(): this {
    Locators.findButton("Proceed to checkout")
      .should("be.visible")
      .click({ scrollBehavior: "top" })
    return this
  }
}

export default new BasketPage()
