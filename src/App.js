import React, { useState, useEffect } from 'react';
import './App.css';
import Textbox from './components/textbox';
import Btnsubmit from './components/btn_submit';
import Scoreboard from './components/score';



// Keeps track of the winning number
let winNumStan = Math.floor(Math.random() * 10) + 1;
let winNumExpert = Math.floor(Math.random() * 100) + 1;

// Keeps track of high score
let currentHighScore = '';
let expertHighScore = '';

const App = () => {
  // State for button when selected that will hide the unselected button
  const [optionSelected, setOptionSelected] = useState('');

  // State for tracking the guesses the user makes
  const [trackSelection, setTrackSelection] = useState([]);

  // State for whatever guess the user makes into the input field
  const [guessInput, setGuessInput] = useState('');

  // State that tells the user if their guess was too high or too low
  const [tooHighOrLow, setTooHighOrLow] = useState('');

  // State that flags the button when clicked
  const [flagButtonClick, setFlagButtonClick] = useState(false);

  // Tracks highscore
  const trackCurrentHighScore = (currentHS) => {
    if (currentHighScore < 1) { // if the high score is 0 - (start of the game)
      currentHighScore = currentHS.length + 1;
    } else {
      if (trackSelection.length < currentHighScore) { // if the current play score is less than the high score put the new score in
        currentHighScore = currentHS.length + 1;
      }
    }
    if (expertHighScore < 1) { // if the high score is 0 - (start of the game)
      expertHighScore = currentHS.length + 1;
    } else {
      if (trackSelection.length < currentHighScore) { // if the current play score is less than the high score put the new score in
        expertHighScore = currentHS.length + 1;
      }
    }

  };
  // Listener for the guesses and the user's inputs
  useEffect(() => {
    // If tooHighOrLow, guessInput and flagbutton is true, push guessInput into array 
    if (tooHighOrLow && guessInput && flagButtonClick) {
      setTrackSelection([...trackSelection, { value: guessInput, winGuess: tooHighOrLow }]);
      if (tooHighOrLow !== 'Win') {
        alert(tooHighOrLow);
      } else if (tooHighOrLow === 'Win') {
        if (optionSelected === 'Standard') {
          if (currentHighScore === 0) {
          } else {
            if (trackSelection.length + 1 < currentHighScore) {
              alert('Congratulations for beating your high score!!!')
            } else if (trackSelection.length + 1 === currentHighScore) {
              alert('Congratulations for winning, but you did not beat your high score.')
            }
          }
        } else {
          if (optionSelected === 'Expert') {
            if (expertHighScore === 0) {
            } else {
              if (trackSelection.length + 1 === expertHighScore) {
                alert('Congratulations for winning, but you did not beat your high score.')
              } else if (trackSelection.length + 1 < expertHighScore) {
                alert('Congratulations for beating your high score!!!')
              }
            }
          }
        }
        alert(`You win! It took you ${trackSelection.length + 1} tries!`);
        trackCurrentHighScore(trackSelection);
        setGuessInput('');
        setTrackSelection([]);
        winNumStan = Math.floor(Math.random() * 10) + 1;
        winNumExpert = Math.floor(Math.random() * 100) + 1;
      };

      setFlagButtonClick(false);
    }

  }, [tooHighOrLow, guessInput, flagButtonClick, trackSelection, trackCurrentHighScore])


  // Standard level begins
  const standard = () => {
    setOptionSelected('Standard');
  }

  // Expert level begins
  const expert = () => {
    setOptionSelected('Expert');
    // setExpertCount(Math.floor(Math.random() * 100) + 1);
  }

  // Keeps the user from entering in character values
  const inputChange = (num) => {
    if (Number(num.target.value) || (num.target.value === "")) {
      setGuessInput(num.target.value)
    }
  }


  // Returns user back to the home screen to change difficuty 
  const changeDiff = (e) => {
    e.preventDefault();
    setOptionSelected(false);
    if (optionSelected === 'Standard') {
      expertHighScore = '';
      setTrackSelection([])
    } else if (optionSelected === 'Expert') {
      currentHighScore = '';
      setTrackSelection([])

    }
  }

  // Resets the game and gives another number
  const reset = (e) => {
    e.preventDefault();
    setTrackSelection([]);
    setGuessInput('');
    // if option selected is "Standard"
    winNumStan = Math.floor(Math.random() * 10) + 1;
    winNumExpert = Math.floor(Math.random() * 100) + 1;

  }

  // Prevents the button from rendering again. Tells User if they guessed too high, too low, or that they won the game. Pushes item into array.
  const buttonClick = (num) => {
    // Prevents Browser default behavior and re-rendering
    num.preventDefault();
    const input = parseInt(guessInput);

    // When the level is selected 
    if (optionSelected === 'Standard') {
      if (input > winNumStan && input < 11) {
        setTooHighOrLow('Too High');
      } else if (input < winNumStan && input < 11) {
        setTooHighOrLow('Too Low');
      } else if (input === winNumStan) {
        setTooHighOrLow('Win');
      } else {
        alert('Please enter a number between 1-10.');
        return;
      };
    } else if (optionSelected === 'Expert') {
      if (input > winNumExpert && input < 101) {
        setTooHighOrLow('Too High');
      } else if (input < winNumExpert && input < 101) {
        setTooHighOrLow('Too Low');
      } else if (input === winNumExpert) {
        setTooHighOrLow('Win');
      } else {
        alert('Please enter a number between 1-100.');
        return;
      };
    }
    setFlagButtonClick(true);
  }

  // Once an option is selected or considered "true", hide the level that came out false.
  if (optionSelected) {
    return (
      <div>
        <header className="Title_Start">{optionSelected} Level</header>
        <form method="post" action="">
          <Textbox data={inputChange} value={guessInput} />
          <Btnsubmit data={buttonClick} reset={reset} changeDiff={changeDiff} />
        </form>
        <Scoreboard score={trackSelection} highScore={optionSelected === 'Standard' ? currentHighScore : expertHighScore} level={optionSelected} />

      </div>
    );

  }
  else {
    return (
      <div className="container-start">
        <header className="Title_Start">Number Guessing Game</header>
        <h2 className="rules">Rules:</h2>
        <p className="desc">
          First, choose a difficulty! (Easy: 1-10; Hard: 1-100). Enter in a number to see if your guess was right. Keep on trying
          to win and try beating your highscore! You can do it! :D
        </p>
        <div className="difficulty">
          <h3>Select the difficulty:</h3>
          <form>
            <button type='button' onClick={standard}>Standard</button>
            <button type='button' onClick={expert}>Expert</button>
          </form>
        </div>
      </div>
    );
  }


}

export default App;