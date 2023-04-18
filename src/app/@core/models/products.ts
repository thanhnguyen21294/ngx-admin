export interface Products extends ExtraProducts {
  id: number
  name: string
  price: number
  quantity: number
  thumbnail: string
  status: boolean
}

export interface ExtraProducts {
  totalPrice?: number
}
