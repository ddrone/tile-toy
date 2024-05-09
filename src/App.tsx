import './App.css'
import { generateTile, initField } from './tiles/tile'
import TileField from './tiles/TileField'

const colors = ["green", "red", "blue"];

function App() {
  const board = initField(7, 7);
  const tile = generateTile(colors);

  return (
    <>
      <TileField initialBoard={board} initialTile={tile} colors={colors} />
    </>
  )
}

export default App
