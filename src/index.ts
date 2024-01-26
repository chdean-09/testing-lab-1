import board from "./classes/board";

// for testing lang ni
export function match(test: string, test2: string): boolean {
  return true;
}

export function kingInCheck(pieces : [Array<string>, Array<string>]) : [boolean, boolean] {
  let chessBoard = new board()

  function placePieces(commands : Array<string>, isWhite : boolean) {
    for (let i = 0; i < commands.length; i++) {
      chessBoard.placePiece(commands[i], isWhite)
    }
  }

  function setAttackedSquares(commands : Array<string>, isWhite : boolean) {
    for (let i = 0; i < commands.length; i++) {
      chessBoard.setAttackedSquare(commands[i], isWhite)
    }
  }

  placePieces(pieces[0], true)
  placePieces(pieces[1], false)
  setAttackedSquares(pieces[0], true)
  setAttackedSquares(pieces[1], false)
  const whiteCheck = chessBoard.isWhiteInCheck()
  const blackCheck = chessBoard.isBlackInCheck()

  return [whiteCheck, blackCheck]
}

// example test
// output should be [false, true]
const pieces : [Array<string>, Array<string>] = [
  ["K-a1", "B-b2", "B-c2", "R-h1", "R-c6", "Q-c7", "N-f8", "N-g5"],
  ["Q-g7", "K-h7"]
]
console.log(kingInCheck(pieces))