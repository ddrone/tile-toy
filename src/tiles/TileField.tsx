import { useState } from 'react';
import './TileField.css';
import { Tile, TileBoard, checkFit } from './tile';

const size = 7;

interface TileFieldAttrs {
  initialTile: Tile;
  initialBoard: TileBoard;
}

function TileField(attrs: TileFieldAttrs) {
  const [nextTile, setNextTile] = useState(attrs.initialTile);
  const [board, setBoard] = useState(attrs.initialBoard);

  // Might actually be a good idea to extract generic clickable/hoverable table
  const [hoverRow, setHoverRow] = useState(-1);
  const [hoverCol, setHoverCol] = useState(-1);

  function renderCell(cell: Tile | undefined, rowIndex: number, colIndex: number) {
    let className = '';
    if (cell === undefined && rowIndex === hoverRow && colIndex === hoverCol) {
      if (checkFit(board, nextTile, rowIndex, colIndex) === undefined) {
        // TODO: actually use the generated message
        className = 'hover-valid';
      } else {
        className = 'hover-invalid';
      }
    }

    const style: Record<string, string> = {};
    if (cell !== undefined) {
      for (const [key, value] of Object.entries(cell)) {
        style[`border-${key}-color`] = value;
      }
    }
    else if (rowIndex === hoverRow && colIndex === hoverCol) {
      for (const [key, value] of Object.entries(nextTile)) {
        style[`border-${key}-color`] = value;
      }
    }

    function handleMouseEnter() {
      setHoverRow(rowIndex);
      setHoverCol(colIndex);
    }

    function handleMouseLeave() {
      setHoverRow(-1);
      setHoverCol(-1);
    }

    return (
      <td className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={style}>
        x
      </td>
    );
  }

  function renderRow(row: (Tile | undefined)[], rowIndex: number) {
    return (
      <tr>
        {row.map((cell, index) => renderCell(cell, rowIndex, index))}
      </tr>
    );
  }

  return (
    <table className="tiles">
      {board.map(renderRow)}
    </table>
  )
}

export default TileField
