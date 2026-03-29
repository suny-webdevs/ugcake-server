export const skuGenerator = (categoryName: string): string => {
  // Extract first letters of each word in category name
  const firstLetters = categoryName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")

  // Get current date/time in ttddmmyy format
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0") // tt
  const day = String(now.getDate()).padStart(2, "0") // dd
  const month = String(now.getMonth() + 1).padStart(2, "0") // mm
  const year = String(now.getFullYear()).slice(-2) // yy

  const timestamp = `${hours}${day}${month}${year}`

  return `UG-${firstLetters}-${timestamp}`
}
