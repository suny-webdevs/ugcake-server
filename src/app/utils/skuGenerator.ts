export const skuGenerator = (
  categoryName: string,
  title: string,
  totalCakes: number,
): string => {
  function getFirstLetters(str: string): string {
    return (str.match(/\b\w/g) || []).join("").toUpperCase()
  }
  const categoryFirstLetters = getFirstLetters(categoryName)
  const titleFirstLetters = getFirstLetters(title)

  return `UGC-${categoryFirstLetters}-${titleFirstLetters}${totalCakes + 1}`
}
