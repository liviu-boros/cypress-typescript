import { Data } from "@data"
import { paginateProducts, selectRandom } from "@utilies"
const apiUrl = Cypress.env("baseAPI")

describe("GET Products", () => {
  it("Random Product response is as expected", () => {
    const randomProduct = selectRandom(Data.Products)

    cy.GET(`${apiUrl}/products/${randomProduct.id}`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a("object")
      expect(response.body.id).to.eq(randomProduct.id)
      expect(response.body.name).to.eq(randomProduct.name)
      expect(response.body.price).to.eq(randomProduct.price)
      expect(response.body.category.name).to.eq(randomProduct.category.name)
      expect(response.body.brand.name).to.eq(randomProduct.brand.name)
    })
  })

  it("First page Products response is as expected", () => {
    const firstPageProducts = paginateProducts(Data.Products, 1)

    cy.GET(`${apiUrl}/products?page=1`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.be.a("array")
      expect(response.body.data).to.have.length(9)
      expect(response.body.data.map((el) => el.name)).to.deep.equal(
        firstPageProducts.map((el) => el.name)
      )
    })
  })

  it("Second page Products response is as expected", () => {
    const secondPageProducts = paginateProducts(Data.Products, 2)

    cy.GET(`${apiUrl}/products?page=2`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.be.a("array")
      expect(response.body.data).to.have.length(9)
      expect(response.body.data.map((el) => el.name)).to.deep.equal(
        secondPageProducts.map((el) => el.name)
      )
    })
  })

  it("Third page Products response is as expected", () => {
    const thirdPageProducts = paginateProducts(Data.Products, 3)

    cy.GET(`${apiUrl}/products?page=3`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.be.a("array")
      expect(response.body.data).to.have.length(8)
      expect(response.body.data.map((el) => el.name)).to.deep.equal(
        thirdPageProducts.map((el) => el.name)
      )
    })
  })
})
