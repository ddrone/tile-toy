import { choose } from "../common/random";

export interface Tile {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

interface TileCheck {
  deltaRow: number;
  deltaCol: number;
  check: (newTile: Tile, existingTile: Tile) => boolean;
  name: string;
}

const checks: TileCheck[] = [
  {
    deltaRow: -1,
    deltaCol: 0,
    check(newTile, existingTile) {
      return newTile.top === existingTile.bottom;
    },
    name: 'top'
  },
  {
    deltaRow: 0,
    deltaCol: -1,
    check(newTile, existingTile) {
      return newTile.left === existingTile.right;
    },
    name: 'left'
  },
  {
    deltaRow: 0,
    deltaCol: 1,
    check(newTile, existingTile) {
      return newTile.right === existingTile.left;
    },
    name: 'right'
  },
  {
    deltaRow: 1,
    deltaCol: 0,
    check(newTile, existingTile) {
      return newTile.bottom === existingTile.top;
    },
    name: 'bottom'
  }
];

export type TileBoard = (Tile | undefined)[][];

export function checkFit(board: TileBoard, tile: Tile, row: number, col: number): string | undefined {
  if (board[row][col] !== undefined) {
    return 'The cell is already occupied';
  }

  for (const check of checks) {
    const rowIndex = row + check.deltaRow;
    const colIndex = col + check.deltaCol;

    if (rowIndex >= 0 && rowIndex < board.length && colIndex >= 0 && colIndex < board[rowIndex].length) {
      const existingTile = board[rowIndex][colIndex];
      if (existingTile !== undefined && !check.check(tile, existingTile)) {
        return `Does not match with ${check.name} tile!`;
      }
    }
  }
}

export function generateTile(colors: string[]): Tile {
  return {
    top: choose(colors),
    bottom: choose(colors),
    left: choose(colors),
    right: choose(colors),
  }
}

export function initField(rows: number, cols: number): TileBoard {
  const result: TileBoard = [];
  for (let i = 0; i < rows; i++) {
    result.push(Array(cols).fill(undefined));
  }

  return result;
}
