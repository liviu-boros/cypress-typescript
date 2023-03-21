import { Data } from "../../support/Data"
import Filters from "../../components/Filters"
import ProductsGrid from "../../components/ProductsGrid"
import {
  sortAlphabetically,
  selectRandom,
  paginateProducts,
  filterProductsByCategory,
} from "../../support/Utils"

describe("Filters", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("All filters are interactible", () => {
    Filters.sort().should("be.visible").select(Data.SortOptions.aToZ)
    Filters.sort().select(Data.SortOptions.zToA)
    Filters.sort().select(Data.SortOptions.lowToHigh)
    Filters.sort().select(Data.SortOptions.HighToLow)

    Filters.searchField().should("be.visible").clear().type("test")
    Filters.searchSubmit().should("be.visible")

    Filters.categoryHammer()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categoryHandSaw()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categoryHandSaw()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categoryScrewdriver()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categoryPliers()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")

    Filters.categoryGrinder()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categorySander()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categorySaw()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.categoryDrill()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")

    Filters.brandName1()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
    Filters.brandName2()
      .should("be.visible")
      .should("not.be.checked")
      .click()
      .should("be.checked")
      .click()
      .should("not.be.checked")
  })

  it("Sorting by name works as expected", () => {
    const Products = [...Data.Products]
    let sortedProducts = []
    let firstPageProducts = []

    //
    // sort products A>Z and limit to first page
    Filters.sort().select(Data.SortOptions.aToZ)
    sortedProducts = Products.sort((a, b) => sortAlphabetically(a.name, b.name))
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products are displayed in the same order
    for (let index = 0; index < firstPageProducts.length; index++) {
      ProductsGrid.allCards()
        .eq(index)
        .should(
          "have.attr",
          "data-test",
          `product-${firstPageProducts[index].id}`
        )
    }

    //
    // sort products Z>A and limit to first page
    Filters.sort().select(Data.SortOptions.zToA)
    sortedProducts.sort((a, b) => sortAlphabetically(b.name, a.name))
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products are displayed in the same order
    for (let index = 0; index < firstPageProducts.length; index++) {
      ProductsGrid.allCards()
        .eq(index)
        .should(
          "have.attr",
          "data-test",
          `product-${firstPageProducts[index].id}`
        )
    }
  })

  it("Sorting by price works as expected", () => {
    let Products = [...Data.Products]
    let sortedProducts = []
    let firstPageProducts = []

    //
    // sort products LOW > HIGH and limit to first page
    Filters.sort().select(Data.SortOptions.lowToHigh)
    sortedProducts = Products.sort((a, b) => a.price - b.price)
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products are displayed in the same order
    for (let index = 0; index < firstPageProducts.length; index++) {
      ProductsGrid.allCards()
        .eq(index)
        .should(
          "have.attr",
          "data-test",
          `product-${firstPageProducts[index].id}`
        )
    }

    //
    // sort products HIGH > LOW and limit to first page
    Filters.sort().select(Data.SortOptions.HighToLow)
    sortedProducts = Products.sort((a, b) => b.price - a.price)
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products are displayed in the same order
    for (let index = 0; index < firstPageProducts.length; index++) {
      ProductsGrid.allCards()
        .eq(index)
        .should(
          "have.attr",
          "data-test",
          `product-${firstPageProducts[index].id}`
        )
    }
  })

  it("Searching for a random product works as expected", () => {
    // select a random product
    const randomProduct = selectRandom(Data.Products)

    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()

    const { id, image, name, price } = randomProduct
    ProductsGrid.verifyProductFacade(id, image, name, price)
  })

  it("Category - Hand Tools filters work as expected", () => {
    let filteredProducts = []

    Filters.categoryHammer().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Hammer")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryHammer().click()

    Filters.categoryHandSaw().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Hand Saw")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryHandSaw().click()

    Filters.categoryWrench().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Wrench")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryWrench().click()

    Filters.categoryScrewdriver().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Screwdriver")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryScrewdriver().click()

    Filters.categoryPliers().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Pliers")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
  })

  it("Category - Power Tools filters work as expected", () => {
    let filteredProducts = []

    Filters.categoryGrinder().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Grinder")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryGrinder().click()

    Filters.categorySander().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Sander")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categorySander().click()

    Filters.categorySaw().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Saw")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categorySaw().click()

    Filters.categoryDrill().click()
    filteredProducts = filterProductsByCategory(Data.Products, "Drill")
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryDrill().click()
  })

  it("Category - Brand filters work as expected", () => {
    // all products are Brand name 1
    let firstPageProducts = []
    firstPageProducts = paginateProducts(Data.Products, 1)

    Filters.brandName1().click()
    for (let product of firstPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.brandName1().click()

    Filters.brandName2().click()
    ProductsGrid.allCards().should("not.exist")
  })
})
