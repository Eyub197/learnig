import React from 'react';


import GuessPlace from '../GuessPlace';
import ResultPanel from '../ResultPanel/ResultPanel';
// Pick a random word on every pageload.
import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from "../../constants"
import WonBanner from '../WonBanner/WonBanner';
import LostBanner from '../LostBanner/LostBanner';
// To make debugging easier, we'll log the solution in the console.

// const answer = sample(WORDS)
// console.log({ answer })



function Game() {
  const [guesses, setGuesses] = React.useState([])
  const [gameStatus, setGameStatus] = React.useState("running")
  const [answer, setAnswer] = React.useState(() => sample(WORDS)) 
  console.log(answer)
  function createGuess(guess) {
    const nextGuesses = [...guesses, guess]
    setGuesses(nextGuesses)
    if (guess === answer) {
      setGameStatus("won")
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) { 
      setGameStatus("lost")
    }
  }

  function reset() { 
    setGuesses([])
    setGameStatus("running")
    setAnswer(sample(WORDS))
    console.log(answer)
  }
  
  return (
    <>
      <ResultPanel items={guesses} answer={answer}/>
      <GuessPlace createGuess={createGuess} gameStatus={gameStatus} />
      {gameStatus === "won" && <WonBanner action={reset} numOfGuesses={guesses.length} />}
      {gameStatus === "lost" && <LostBanner action={reset} actionText="Restart game" answer={answer} />}
    </>
  )
}

export default Game;
