class Locators {
  public static findURL() {
    return cy.url()
  }

  public static findCategory(label: string) {
    return cy.contains(label)
  }

  public static findNavBar(label: string) {
    return cy.get("nav").contains("nav", label).scrollIntoView()
  }

  public static findSubCategory(label: string) {
    return cy.get("li").contains(label)
  }

  public static findItem(id: string) {
    return cy.get(`li[data-testid="productTileTracker-${id}"]`)
  }

  public static findButton(label: string) {
    return cy.contains("span", label).parents("button")
  }

  public static findFlyout() {
    return cy.get('[data-testid="flyoutDialog"]')
  }

  public static findOption(label: string) {
    return cy.contains('div[data-testid="optionContentLabel"]', label)
  }

  public static findMessage(label: string) {
    return cy.contains("span", label)
  }

  public static findTotalRow(label: string) {
    return cy.contains("div", label).next()
  }
}

export default Locators
