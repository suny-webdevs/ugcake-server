export interface ICake {
  customizable?: boolean
  title: string
  description: string
  price: string
  images?: any
  cakeType: "CUPCAKE" | "CAKE"
  flavors: string
  weight: string
  features?: string
  category: string
  stock: string
  specificationLabel?: string
  specificationValue?: string
  nutritionLabel?: string
  nutritionValue?: string
}
