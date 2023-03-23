import { Data } from "@data"
import { selectRandom } from "@utilies"
const apiUrl = Cypress.env("baseAPI")

describe("GET Categories", () => {
  it("Random Category response is as expected", () => {
    const brands = [...Data.Brands]
    const randomBrand = selectRandom(brands)

    cy.GET(`${apiUrl}/brands/${randomBrand.id}`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a("object")
      expect(response.body.id).to.eq(randomBrand.id)
      expect(response.body.name).to.eq(randomBrand.name)
    })
  })

  it("Categories response is as expected", () => {
    const brands = [...Data.Brands]

    cy.GET(`${apiUrl}/brands`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a("array")
      expect(response.body).to.have.length(2)
      expect(response.body.map((el) => el.name)).to.deep.eq(
        brands.map((el) => el.name)
      )
    })
  })
})
