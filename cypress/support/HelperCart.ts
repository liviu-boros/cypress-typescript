interface Product {
  readonly id: number
  readonly image: string
  readonly name: string
  readonly price: number
  quantity?: number
}

/**
 * Represents a HelperCart object that manages the list of products in the cart.
 */
export class HelperCart {
  private _cartList: Product[]

  constructor() {
    this._cartList = []
  }

  /**
   * Adds a new product to the cart or increases the quantity of an existing product.
   * @param {Product} product - The product to add to the cart.
   */
  addProduct(product: Product): void {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )
    if (existingProduct) {
      this.increaseQuantity(existingProduct, 1)
    } else {
      const newProduct = { ...product }
      newProduct.quantity = 1
      this._cartList.push(newProduct)
    }
  }

  /**
   * Removes a product from the cart.
   * @param {Product} product - The product to remove from the cart.
   * @throws {Error} If the product is not found in the cart.
   */
  removeProduct(product: Product): void {
    const existingProductIndex = this._cartList.findIndex(
      (el) => el.name === product.name
    )
    if (existingProductIndex === -1) {
      throw new Error("Product not found in cart")
    }
    this._cartList.splice(existingProductIndex, 1)
  }

  /**
   * Increases the quantity of a product in the cart by a specified amount.
   * @param {Product} product - The product to increase the quantity of.
   * @param {number} times - The amount to increase the quantity by.
   * @throws {Error} If the product is not found in the cart or its quantity is undefined.
   */
  increaseQuantity(product: Product, times: number): void {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    existingProduct.quantity += times
  }

  /**
   * Decreases the quantity of a product in the cart by a specified amount.
   * @param {Product} product - The product to decrease the quantity of.
   * @param {number} times - The amount to decrease the quantity by.
   * @throws {Error} If the product is not found in the cart or its quantity is undefined.
   */
  decreaseQuantity(product: Product, times: number): void {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    existingProduct.quantity -= times
  }

  /**
   * Returns the list of products in the cart.
   * @returns {Product[]} The list of products in the cart.
   * @throws {Error} If the cart is empty.
   */
  getCart(): Product[] {
    if (this._cartList.length === 0) throw new Error("Cart is empty")
    return this._cartList
  }

  /**
   * Returns the total price of a specific product in the cart.
   * @param {Product} product - The product to get the total price of.
   * @returns {string} The total price of the product, formatted to 2 decimal places.
   * @throws {Error} If the product is not found in the cart or its quantity is undefined.
   */
  getTotalProductPrice(product: Product): string {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    return (existingProduct.price * existingProduct.quantity).toFixed(2)
  }

  /**
   * Returns the quantity of a specific product in the cart.
   * @param {Product} product - The product to get the quantity of.
   * @returns {string} The quantity of the product, formatted to 0 decimal places.
   * @throws {Error} If the product is not found in the cart or its quantity is undefined.
   */
  getProductQuantity(product: Product): string {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    return existingProduct.quantity.toFixed(0)
  }

  /**
   * Returns the total quantity of all products in the cart.
   * @returns {string} The total quantity of all products in the cart, formatted to 0 decimal places.
   * @throws {Error} If any product in the cart has an undefined quantity.
   */
  getTotalQuantity(): string {
    const totalQuantity = this._cartList.reduce((acc, curr) => {
      if (curr.quantity === undefined) {
        throw new Error("Product quantity is undefined")
      }
      return acc + curr.quantity
    }, 0)

    return totalQuantity.toFixed(0)
  }

  /**
   * Returns the total price of all products in the cart.
   * @returns {string} The total price of all products in the cart, formatted to 2 decimal places.
   * @throws {Error} If any product in the cart has an undefined quantity.
   */
  getTotalPrice(): string {
    const totalPrice = this._cartList.reduce((acc, curr) => {
      if (curr.quantity === undefined) {
        throw new Error("Product quantity is undefined")
      }
      return acc + curr.price * curr.quantity
    }, 0)

    return totalPrice.toFixed(2)
  }
}
