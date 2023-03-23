import { Data } from "@data"
import Filters from "@components/Filters"
import ProductsGrid from "@components/ProductsGrid"
import {
  sortAlphabetically,
  selectRandom,
  paginateProducts,
  filterProductsByCategory,
} from "@utilies"

describe("Filters", () => {
  // visit home page
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
    // create a new list from pre-defined list of products
    const products = [...Data.Products]
    let sortedProducts = []
    let firstPageProducts = []

    // select sort A > Z
    // sort products list and filter to first page
    Filters.sort().select(Data.SortOptions.aToZ)
    sortedProducts = products.sort((a, b) => sortAlphabetically(a.name, b.name))
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products order
    for (let index = 0; index < firstPageProducts.length; index++) {
      ProductsGrid.allCards()
        .eq(index)
        .should(
          "have.attr",
          "data-test",
          `product-${firstPageProducts[index].id}`
        )
    }

    // select sort Z > A
    // sort products list and filter to first page
    Filters.sort().select(Data.SortOptions.zToA)
    sortedProducts = products.sort((a, b) => sortAlphabetically(b.name, a.name))
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products order
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
    // create a new list from pre-defined list of products
    const products = [...Data.Products]
    let sortedProducts = []
    let firstPageProducts = []

    // select sort LOW > HIGH
    // sort products list and filter to first page
    Filters.sort().select(Data.SortOptions.lowToHigh)
    sortedProducts = products.sort((a, b) => a.price - b.price)
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products order
    for (let index = 0; index < firstPageProducts.length; index++) {
      ProductsGrid.allCards()
        .eq(index)
        .should(
          "have.attr",
          "data-test",
          `product-${firstPageProducts[index].id}`
        )
    }

    // select sort HIGH > LOW
    // sort products list and filter to first page
    Filters.sort().select(Data.SortOptions.HighToLow)
    sortedProducts = products.sort((a, b) => b.price - a.price)
    firstPageProducts = paginateProducts(sortedProducts, 1)

    // verify products order
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
    // select a random product from pre-defined list of products
    const randomProduct = selectRandom(Data.Products)

    // search for product by name
    Filters.searchField().clear().type(randomProduct.name)
    Filters.searchSubmit().click()

    // verify product card
    const { id, image, name, price } = randomProduct
    ProductsGrid.verifyProductFacade(id, image, name, price)
  })

  it("Category - Hand Tools filters work as expected", () => {
    const products = [...Data.Products]
    let filteredProducts = []

    // tick Hammer filter
    // filter products
    Filters.categoryHammer().click()
    filteredProducts = filterProductsByCategory(products, "Hammer")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryHammer().click()

    // tick HandSaw filter
    // filter products
    Filters.categoryHandSaw().click()
    filteredProducts = filterProductsByCategory(products, "Hand Saw")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryHandSaw().click()

    // tick Wrench filter
    // filter products
    Filters.categoryWrench().click()
    filteredProducts = filterProductsByCategory(products, "Wrench")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryWrench().click()

    // tick Screwdriver filter
    // filter products
    Filters.categoryScrewdriver().click()
    filteredProducts = filterProductsByCategory(products, "Screwdriver")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryScrewdriver().click()

    // tick Pliers filter
    // filter products
    Filters.categoryPliers().click()
    filteredProducts = filterProductsByCategory(products, "Pliers")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
  })

  it("Category - Power Tools filters work as expected", () => {
    const products = [...Data.Products]
    let filteredProducts = []

    // tick Grinder filter
    // filter products
    Filters.categoryGrinder().click()
    filteredProducts = filterProductsByCategory(products, "Grinder")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryGrinder().click()

    // tick Grinder filter
    // filter products
    Filters.categorySander().click()
    filteredProducts = filterProductsByCategory(products, "Sander")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categorySander().click()

    // tick Grinder filter
    // filter products
    Filters.categorySaw().click()
    filteredProducts = filterProductsByCategory(products, "Saw")
    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categorySaw().click()

    // tick Grinder filter
    // filter products
    Filters.categoryDrill().click()
    filteredProducts = filterProductsByCategory(products, "Drill")

    // verify products grid
    for (let product of filteredProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.categoryDrill().click()
  })

  it("Category - Brand filters work as expected", () => {
    const firstPageProducts = paginateProducts(Data.Products, 1)

    // tick Brand name 1 filter
    Filters.brandName1().click()

    // verify products grid
    for (let product of firstPageProducts) {
      const { id, image, name, price } = product
      ProductsGrid.verifyProductFacade(id, image, name, price)
    }
    Filters.brandName1().click()

    // tick Brand name 2 filter
    Filters.brandName2().click()

    // no product is brand name 1
    // verify products grid is empty
    ProductsGrid.allCards().should("not.exist")
  })
})
