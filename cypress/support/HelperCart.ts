interface Product {
  readonly id: string
  readonly image: string
  readonly name: string
  readonly price: number
  quantity?: number
}

export class HelperCart {
  private readonly _cartList: Product[] = []

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
      product.quantity = 1
      this._cartList.push(product)
    }
  }

  increaseQuantity(product: Product, times: number): void {
    product.quantity += times
  }

  getCart(): Product[] {
    return this._cartList
  }

  getTotalProductPrice(product: Product): string {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )
    return (existingProduct.price * existingProduct.quantity).toFixed(2)
  }

  getProductQuantity(product: Product): string {
    const existingProduct = this._cartList.find(
      (el) => el.name === product.name
    )
    return existingProduct.quantity.toFixed(0)
  }

  getTotalQuantity(): string {
    return this._cartList
      .reduce((acc, curr) => acc + curr.quantity, 0)
      .toFixed(0)
  }

  getTotalPrice(): string {
    const totalPrice = this._cartList.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    )
    return totalPrice.toFixed(2)
  }
}
