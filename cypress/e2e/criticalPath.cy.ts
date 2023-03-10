import BasketPage from "../pages/BasketPage"
import HomePage from "../pages/HomePage"
import ItemsDetailsPage from "../pages/ItemsDetailsPage"
import ItemsPage from "../pages/ItemsPage"

const userAgent = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1 en-us",
  },
}

describe("template spec", () => {
  before(() => {
    cy.visit("https://m.aboutyou.com", userAgent)
    cy.contains("button", "Ok")
      .should("be.visible")
      .click()
      .should("not.be.visible")
    // cy.intercept(
    //   "POST",
    //   "https://tadarida-web.aboutyou.com/aysa_api.services.article_detail_page.v1.ArticleDetailService/GetProductBulk"
    // ).as("apiCall")
  })
  it("passes critical path", () => {
    HomePage.selectCategory("Clothing")
    HomePage.assertNavBarIsVisible("Clothing")
    HomePage.selectSubCategory("Jackets")

    ItemsPage.assertURLContains("/women/clothing/jackets")
    ItemsPage.assertItemDetailsContain(
      "9183980",
      "Pacemaker",
      "$ 145.90"
    ).selectItem()

    ItemsDetailsPage.assertURLContains(
      "/pacemaker/between-season-jacket-devran"
    )
    // FIXME - uncaught exception around this step, no idea of root cause
    // cy.wait("@apiCall")
    // tried intercepting API calls but didn't work
    // cy.wait(3000)
    ItemsDetailsPage.selectAddToBasket()
    ItemsDetailsPage.assertFlyoutIsDisplayed().selectOption("M")
    ItemsDetailsPage.assertSuccessfulBasketAdd()
    ItemsDetailsPage.selectGoToBasket()

    BasketPage.assertURLContains("/basket")
    BasketPage.assertTotalRow("In total", "$ 145.90")
    BasketPage.selectProceedToCheckout()
  })
})
