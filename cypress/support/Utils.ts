import { Data } from "./Data"

export const sortAlphabetically = (a: string, b: string): number => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const selectRandom = <T>(products: T[]): T => {
  const randomIndex = Math.floor(Math.random() * products.length)
  return products[randomIndex]
}

export const paginateProducts = <T>(products: T[], pageIndex: number): T[] => {
  const itemsPerPage = Data.productsPerPage
  const start = (pageIndex - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.slice(start, end)
}

export const filterProductsByCategory = <
  T extends { category: { name: string } }
>(
  products: T[],
  filterBy: string
): T[] => {
  return products.filter((el) => el.category.name === filterBy)
}
