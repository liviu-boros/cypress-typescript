import { Data } from "./Data"

export const sortAlphabetically = (a: string, b: string): number => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const randomizeProduct = (products) => {
  const randomIndex = Math.floor(Math.random() * products.length)
  return products[randomIndex]
}

export const paginateProducts = (products, pageIndex) => {
  const itemsPerPage = Data.productsPerPage
  const start = (pageIndex - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.slice(start, end)
}

export const filterProductsByCategory = (products, filterBy) => {
  return products.filter((el) => el.category.name === filterBy)
}
