// useState
import { useState } from 'react';
// utils
import generateUniqueObjects from './utils';
// components
import Roulette from './components/Roulette';
//
//
export default function App() {
  // vars
  let initialNumberOfSectors = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
  let initialNumberOfDegrees = initialNumberOfSectors * -18;
  // hooks
  const [gameData, setGameData] = useState(generateUniqueObjects(20, 1, 20));
  const [totalNumberOfDegrees, setTotalNumberOfDegrees] = useState(
    initialNumberOfDegrees
  );
  const [selectedIndex, setSelectedIndex] = useState(initialNumberOfSectors);
  const [winningNumber, setWinningNumber] = useState(
    Math.floor(Math.random() * 20) + 1
  );
  const [gameCount, setGameCount] = useState(1);
  const [isWin, setIsWin] = useState(false);

  // local vars
  // functions
  const handleNewGame = () => {
    initialNumberOfSectors = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
    initialNumberOfDegrees = initialNumberOfSectors * -18;
    setGameData(generateUniqueObjects(20, 1, 20));
    setTotalNumberOfDegrees(initialNumberOfDegrees);
    setSelectedIndex(initialNumberOfSectors);
    setWinningNumber(Math.floor(Math.random() * 20) + 1);
    setGameCount((prev) => prev + 1);
    setIsWin(false);
  };
  // return
  return (
    <>
      <div id='app'>
        <Roulette
          data={gameData}
          totalNumberOfDegrees={totalNumberOfDegrees}
          setTotalNumberOfDegrees={setTotalNumberOfDegrees}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          winningNumber={winningNumber}
          gameCount={gameCount}
          isWin={isWin}
          setIsWin={setIsWin}
        />
        <button disabled={!isWin} onClick={handleNewGame} id='newGame'>
          new game
        </button>

        <div className='winningNumber'>{`🏆 = ${winningNumber}`}</div>
      </div>
    </>
  );
}
