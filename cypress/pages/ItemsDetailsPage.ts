import Locators from "../locators/Locators"

class ItemDetailsPage {
  private itemId: string

  public assertURLContains(label: string): this {
    Locators.findURL().should("contain", label)
    return this
  }

  public assertItemDetailsContain(
    id: string,
    brand: string,
    price: string
  ): this {
    Locators.findItem(id)
      .find('p[data-testid="brandName"]')
      .should("have.text", brand)
      .next()
      .find('span[data-testid="finalPrice"]')
      .should("have.text", price)
    this.itemId = id
    return this
  }

  public selectItem(): this {
    Locators.findItem(this.itemId).click({ scrollBehavior: "top" })
    return this
  }

  public selectAddToBasket(): this {
    Locators.findButton("Add to basket").click({ scrollBehavior: "top" })
    return this
  }

  public assertFlyoutIsDisplayed(): this {
    Locators.findFlyout().should("exist")
    return this
  }

  public selectOption(label: string): this {
    Locators.findOption(label).should("be.visible").click()
    return this
  }

  public assertSuccessfulBasketAdd(): this {
    Locators.findMessage("Successfully added to your cart!").should(
      "be.visible"
    )
    return this
  }

  public selectGoToBasket(): this {
    Locators.findButton("Go to basket")
      .should("be.visible")
      .click({ scrollBehavior: "top" })
    return this
  }
}

export default new ItemDetailsPage()
