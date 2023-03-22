interface Product {
  readonly id: number
  readonly image: string
  readonly name: string
  readonly price: number
  quantity?: number
}

export class HelperCart {
  private _cartList: Product[]

  constructor() {
    this._cartList = []
  }

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

  removeProduct(product: Product): void {
    const existingProductIndex = this._cartList.findIndex(
      (el) => el.name === product.name
    )
    if (existingProductIndex === -1) {
      throw new Error("Product not found in cart")
    }
    this._cartList.splice(existingProductIndex, 1)
  }

  increaseQuantity(product: Product, times: number): void {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    existingProduct.quantity += times
  }

  decreaseQuantity(product: Product, times: number): void {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    existingProduct.quantity -= times
  }

  getCart(): Product[] {
    if (this._cartList.length === 0) throw new Error("Cart is empty")
    return this._cartList
  }

  getTotalProductPrice(product: Product): string {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    return (existingProduct.price * existingProduct.quantity).toFixed(2)
  }

  getProductQuantity(product: Product): string {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )

    if (!existingProduct) throw new Error("Product not found in cart")
    if (existingProduct.quantity === undefined)
      throw new Error("Product quantity is undefined")

    return existingProduct.quantity.toFixed(0)
  }

  getTotalQuantity(): string {
    const totalQuantity = this._cartList.reduce((acc, curr) => {
      if (curr.quantity === undefined) {
        throw new Error("Product quantity is undefined")
      }
      return acc + curr.quantity
    }, 0)

    return totalQuantity.toFixed(0)
  }

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
