import { Data } from "@data"

/**
 * Sorts two strings alphabetically.
 * Used for .sort()
 *
 * @param {string} a - The first string to compare.
 * @param {string} b - The second string to compare.
 * @returns {number} -1, 0, 1
 */
export const sortAlphabetically = (a: string, b: string): number => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

/**
 * Selects a random item from an array.
 *
 * @template {T} - The type of items in the array.
 * @param {T[]} list - The array of items to select from.
 * @returns {T} A random item from the list.
 */
export const selectRandom = <T>(list: T[]): T => {
  const randomIndex = Math.floor(Math.random() * list.length)
  return list[randomIndex]
}

/**
 * Paginates an array of items.
 *
 * @template {T} - The type of items in the array.
 * @param {T[]} products - The array of items to paginate.
 * @param {number} pageIndex - The page index to retrieve.
 * @returns {T[]} The items on the specified page.
 */
export const paginateProducts = <T>(products: T[], pageIndex: number): T[] => {
  const itemsPerPage = Data.productsPerPage
  const start = (pageIndex - 1) * itemsPerPage
  const end = start + itemsPerPage
  return products.slice(start, end)
}

/**
 * Filters an array of products by category.
 *
 * @template {T extends { category: { name: string } }} - The type of products in the array.
 * @param {T[]} products - The array of products to filter.
 * @param {string} filterBy - The name of the category to filter by.
 * @returns {T[]} The products that belong to the specified category.
 */
export const filterProductsByCategory = <
  T extends { category: { name: string } }
>(
  products: T[],
  filterBy: string
): T[] => {
  return products.filter((el) => el.category.name === filterBy)
}
