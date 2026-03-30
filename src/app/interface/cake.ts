export interface ICake {
  customizable?: boolean
  title: string
  description: string
  price: number
  images?: any
  cakeType: "CUPCAKE" | "CAKE"
  flavors: string
  weight: string
  features?: string
  category: string
  stock: number
  specificationLabel?: string
  specificationValue?: string
  nutritionLabel?: string
  nutritionValue?: string
}
