export default function filesToIndex(file: string) : number | undefined {
  if (file === "h") {
    return 0
  } else if (file === "g") {
    return 1
  } else if (file === "f") {
    return 2
  } else if (file === "e") {
    return 3
  } else if (file === "d") {
    return 4
  } else if (file === "c") {
    return 5
  } else if (file === "b") {
    return 6
  } else if (file === "a") {
    return 7
  }

  return undefined
}