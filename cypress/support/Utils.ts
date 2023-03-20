import { Data } from "./Data"

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
