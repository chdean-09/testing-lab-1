export function attackSquareKnight(position: [number, number]) : Array<Array<number>> {
  let attackableSquares : Array<[number, number]> = []

  attackableSquares.push([position[0] + 2, position[1] - 1])
  attackableSquares.push([position[0] + 2, position[1] + 1])
  attackableSquares.push([position[0] - 2, position[1] - 1])
  attackableSquares.push([position[0] - 2, position[1] + 1])
  attackableSquares.push([position[0] + 1, position[1] - 2])
  attackableSquares.push([position[0] + 1, position[1] + 2])
  attackableSquares.push([position[0] - 1, position[1] - 2])
  attackableSquares.push([position[0] - 1, position[1] + 2])

  attackableSquares = attackableSquares.filter(attackPosition => {
    if (attackPosition[0] < 0 || attackPosition[0] > 7) {
      return false
    }

    if (attackPosition[1] < 0 || attackPosition[1] > 7) {
      return false
    }

    return true
  })

  return attackableSquares
}

export function attackSquarePawn(position: [number, number], isWhite : boolean) : Array<Array<number>> {
  let attackableSquares : Array<[number, number]> = []

  if (isWhite) {
    attackableSquares.push([position[0] - 1, position[1] - 1])
    attackableSquares.push([position[0] - 1, position[1] + 1])
  } else {
    attackableSquares.push([position[0] + 1, position[1] - 1])
    attackableSquares.push([position[0] + 1, position[1] + 1])
  }

  attackableSquares.filter(attackPosition => {
    if (attackPosition[0] < 0 || attackPosition[0] > 7) {
      return false
    }

    if (attackPosition[1] < 0 || attackPosition[1] > 7) {
      return false
    }

    return true
  })

  return attackableSquares
}

export function attackSquareRook(position: [number, number], piecesOnBoard : Array<Array<number>>) : Array<Array<number>> {
  let attackableSquares : Array<[number, number]> = []
  let attackPosition : [number, number] = [position[0], position[1]]
  let scan = 0
  const pieces = piecesOnBoard

  while (true) {
    if (scan === 0) {
      attackPosition[0] -= 1
    } else if (scan === 1) {
      attackPosition[0] += 1
    } else if (scan === 2) {
      attackPosition[1] -= 1
    } else if (scan === 3) {
      attackPosition[1] += 1
    }

    if (pieces.some(piece => (piece[0] === attackPosition[0] && piece[1] === attackPosition[1]))) {
      const attackPositionInitial : [number, number] = [...attackPosition]
      attackableSquares.push(attackPositionInitial)
      attackPosition = [position[0], position[1]]
      scan++
    } else if (attackPosition[0] < 0 || attackPosition[0] > 7 || attackPosition[1] < 0 || attackPosition[1] > 7) {
      attackPosition = [position[0], position[1]]
      scan++
    } else {
      const attackPositionInitial : [number, number] = [...attackPosition]
      attackableSquares.push(attackPositionInitial)
    }

    if (scan > 3) {
      break
    }
  }

  return attackableSquares
}

export function attackSquareBishop(position: [number, number], pieces : Array<Array<number>>) : Array<Array<number>> {
  let attackableSquares : Array<[number, number]> = []
  let attackPosition : [number, number] = [position[0], position[1]]
  let scan = 0

  while (true) {
    if (scan === 0) {
      attackPosition[0] -= 1
      attackPosition[1] -= 1
    } else if (scan === 1) {
      attackPosition[0] += 1
      attackPosition[1] += 1
    } else if (scan === 2) {
      attackPosition[0] -= 1
      attackPosition[1] += 1
    } else if (scan === 3) {
      attackPosition[0] += 1
      attackPosition[1] -= 1
    }

    if (pieces.some(piece => (piece[0] === attackPosition[0] && piece[1] === attackPosition[1]))) {
      const attackPositionInitial : [number, number] = [...attackPosition]
      attackableSquares.push(attackPositionInitial)
      attackPosition = [position[0], position[1]]
      scan++
    } else if (attackPosition[0] < 0 || attackPosition[0] > 7 || attackPosition[1] < 0 || attackPosition[1] > 7) {
      attackPosition = [position[0], position[1]]
      scan++
    } else {
      const attackPositionInitial : [number, number] = [...attackPosition]
      attackableSquares.push(attackPositionInitial)
    }

    if (scan > 3) {
      break
    }
  }

  return attackableSquares
}