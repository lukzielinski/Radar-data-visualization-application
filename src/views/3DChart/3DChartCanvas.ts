
const colors: Map<number, string> = new Map()

function getRandomColor () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export function checkColor (objectId: number) {
  if (colors.has(objectId)) {
    return colors.get(objectId)!
  } else {
    const color = getRandomColor()
    colors.set(objectId, color)
    return color
  }
}
