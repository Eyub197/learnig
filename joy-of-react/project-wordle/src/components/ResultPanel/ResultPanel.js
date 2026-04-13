import React from 'react';
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function ResultPanel({ items, answer }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((num, index) => { 
        const guess = items[num]
        return <Guess value={guess} key={num} answer={answer}/>
      } )}
    </div>
  )
  
}

export default ResultPanel;
