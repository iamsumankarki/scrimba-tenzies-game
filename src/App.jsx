import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import Dice from "./components/Dice";

function App() {
  const [dices, setDices] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const timeIntervalRef = useRef(null);

  useEffect(() => {
    const isAllFreezed = dices.every((dice) => dice.isHeld);
    const initialValue = dices[0] && dices[0].value;
    const isAllSameValue = dices.every((dice) => dice.value === initialValue);

    if (isAllFreezed && isAllSameValue) {
      clearInterval(timeIntervalRef.current);
      setTenzies(true);
    }
  }, [dices]);

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);

      newDice.push({ id: nanoid(), value: randomNumber, isHeld: false });
    }

    return newDice;
  }
  function createDiceElements() {
    return dices.map((dice) => (
      <Dice
        key={dice.id}
        data={dice}
        handleClick={() => handleFreezeDice(dice.id)}
      />
    ));
  }
  function handleFreezeDice(id) {
    if (!hasTimerStarted) {
      setHasTimerStarted(true);
      timer();
    }

    setDices((prevDices) => {
      return prevDices.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }
  function handleRollDice() {
    if (!hasTimerStarted) {
      setHasTimerStarted(true);
      timer();
    }

    setRolls((prevRolls) => prevRolls + 1);
    setDices((prevDices) => {
      return prevDices.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.ceil(Math.random() * 6) };
      });
    });
  }
  function handleResetGame() {
    clearInterval(timeIntervalRef.current);
    setHasTimerStarted(false);
    setTenzies(false);
    setRolls(0);
    setTimeSpent(0);
    setDices(allNewDice());
  }

  function timer() {
    timeIntervalRef.current = setInterval(() => {
      setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
    }, 1000);
  }

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  return (
    <main className="wrapper">
      <div className="container">
        <div className="content">
          {tenzies && <Confetti width="300" height="320" />}
          <div>
            <h1 className="heading">Tenzies</h1>
            <p className="description">
              Roll until all dice are the same. Click each Dice to freeze it at
              its current value between rolls.
            </p>

            <ul className="dices">{createDiceElements()}</ul>

            <button
              className="button"
              onClick={() => {
                tenzies ? handleResetGame() : handleRollDice();
              }}
            >
              {tenzies ? "New Game" : "Roll"}
            </button>

            <div className="extra-info">
              <p>Rolls: {rolls}</p>
              <p>Time Spent: {fancyTimeFormat(timeSpent)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
