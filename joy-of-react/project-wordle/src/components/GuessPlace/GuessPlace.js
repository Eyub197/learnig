import React from 'react';



function GuessPlace({ createGuess, gameStatus }) {
  const [guess, setGuess] = React.useState("")

  function handleSubmit(event) { 
    event.preventDefault()
    createGuess(guess)
    setGuess("")
  }

  return (
    <form onSubmit={event => handleSubmit(event)} className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={event => setGuess(event.target.value.toUpperCase())}
        minLength={5}
        maxLength={5}
        pattern="[A-Za-z]{5}"
        required
        title="5 letter word"
        disabled={ gameStatus !== "running"}
      />

    </form>
  )
}

export default GuessPlace;
