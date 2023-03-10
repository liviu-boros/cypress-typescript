import Locators from "../locators/Locators"

class ItemsPage {
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
}

export default new ItemsPage()
