import filesToIndex from "../utils/filesToIndex";
import {
  attackSquarePawn,
  attackSquareBishop,
  attackSquareKnight,
  attackSquareRook,
} from "../utils/attackSquares";

export default class board {
  whiteAttackedSquaresIndex: Array<Array<number>>;
  blackAttackedSquaresIndex: Array<Array<number>>;
  piecesIndex: Array<Array<number>>;
  whiteKingPieceIndex: [number, number] | undefined;
  blackKingPieceIndex: [number, number] | undefined;

  constructor() {
    this.whiteAttackedSquaresIndex = [];
    this.blackAttackedSquaresIndex = [];
    this.piecesIndex = [];
    this.whiteKingPieceIndex = undefined;
    this.blackKingPieceIndex = undefined;
  }

  placePiece(input: string, isWhite: boolean) {
    if (input[0] === "K") {
      // place king
      const file = filesToIndex(input[2]);
      const rank = Number(input[3]) - 1;
      if (file != undefined && rank != undefined) {
        const position: [number, number] = [rank, file]
        if (isWhite) {
          this.whiteKingPieceIndex = [rank, file];
        } else {
          this.blackKingPieceIndex = [rank, file];
        }

        const piecesIndexInitial = [
          ...this.piecesIndex,
          position,
        ];
        this.piecesIndex = piecesIndexInitial
      }
    } else {
      // place non King Pieces
      let file: number | undefined = undefined;
      let rank: number | undefined = undefined;
      if (input.length === 2) {
        file = filesToIndex(input[0]);
        rank = Number(input[1]) - 1;
      } else {
        file = filesToIndex(input[2]);
        rank = Number(input[3]) - 1;
      }

      if (file != undefined && rank != undefined) {
        const position: [number, number] = [rank, file];
        const piecesIndexInitial = [
          ...this.piecesIndex,
          position,
        ];
        this.piecesIndex = piecesIndexInitial
      }
    }
  }

  setAttackedSquare(input: string, isWhite: boolean) {
    let file: number | undefined = undefined;
    let rank: number | undefined = undefined;
    if (input.length === 2) {
      file = filesToIndex(input[0]);
      rank = Number(input[1]) - 1;
    } else {
      file = filesToIndex(input[2]);
      rank = Number(input[3]) - 1;
    }

    if (file != undefined && rank != undefined) {
      const position: [number, number] = [rank, file]

      let attackingSquares: Array<Array<number>> = [];

      if (input.length === 2) {
        attackingSquares = attackSquarePawn(position, isWhite);
      }

      if (input[0] === "Q") {
        attackingSquares = attackSquareRook(position, this.piecesIndex);
        attackingSquares.push(...attackSquareBishop(position, this.piecesIndex));
      }

      if (input[0] === "R") {
        attackingSquares = attackSquareRook(position, this.piecesIndex);
      }

      if (input[0] === "B") {
        attackingSquares = attackSquareBishop(position, this.piecesIndex);
      }

      if (input[0] === "N") {
        attackingSquares = attackSquareKnight(position);
      }

      if (isWhite) {
        const whiteAttackedSquaresIndexInitial = [
          ...this.whiteAttackedSquaresIndex,
          ...attackingSquares,
        ];
        this.whiteAttackedSquaresIndex = whiteAttackedSquaresIndexInitial;
      } else {
        const blackAttackedSquaresIndexInitial = [
          ...this.blackAttackedSquaresIndex,
          ...attackingSquares,
        ];
        this.blackAttackedSquaresIndex = blackAttackedSquaresIndexInitial;
      }
    }
  }

  isWhiteInCheck() : boolean {
    if (this.whiteKingPieceIndex !== undefined) {
      const kingRank = this.whiteKingPieceIndex[0]
      const kingFile = this.whiteKingPieceIndex[1]
      const whiteChecked = this.blackAttackedSquaresIndex.some(square => {
        if (square[0] === kingRank && square[1] === kingFile) {
          return true
        }
      })

      return whiteChecked
    }

    return false
  }

  isBlackInCheck() : boolean {
    if (this.blackKingPieceIndex !== undefined) {
      const kingRank = this.blackKingPieceIndex[0]
      const kingFile = this.blackKingPieceIndex[1]
      const blackChecked = this.whiteAttackedSquaresIndex.some(square => {
        if (square[0] === kingRank && square[1] === kingFile) {
          return true
        }
      })

      return blackChecked
    }

    return false
  }
}
