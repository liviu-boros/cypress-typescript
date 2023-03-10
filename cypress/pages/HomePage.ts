import Locators from "../locators/Locators"

class HomePage {
  public selectCategory(label: string): this {
    Locators.findCategory(label).click()
    return this
  }

  public assertNavBarIsVisible(label: string): this {
    Locators.findNavBar(label).should("be.visible")
    return this
  }

  public selectSubCategory(label: string): this {
    Locators.findSubCategory(label).click()
    return this
  }
}

export default new HomePage()
