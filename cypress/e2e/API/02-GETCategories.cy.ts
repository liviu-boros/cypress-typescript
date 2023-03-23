import { Data } from "@data"
import { selectRandom } from "@utilies"
const apiUrl = Cypress.env("baseAPI")

describe("GET Categories", () => {
  it("Random Category response is as expected", () => {
    const categories = [...Data.Categories].slice(2, 10)
    const randomCategory = selectRandom(categories)

    cy.GET(`${apiUrl}/categories/${randomCategory.id}`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a("object")
      expect(response.body.id).to.eq(randomCategory.id)
      expect(response.body.name).to.eq(randomCategory.name)
    })
  })

  it("Categories response is as expected", () => {
    const categories = [...Data.Categories]

    cy.GET(`${apiUrl}/categories`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a("array")
      expect(response.body).to.have.length(12)
      expect(response.body.map((el) => el.name)).to.deep.eq(
        categories.map((el) => el.name)
      )
    })
  })
})
