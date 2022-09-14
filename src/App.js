import "./App.css";
import { useEffect, useState } from "react";
import { getRandomWord } from "./Commands.js";

function App() {
  const [entries, setEntries] = useState({
    matrix: [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ],
    row: 0,
    column: 0,
    word: null,
    done: false,
  });

  useEffect(() => {
    function UpdateMatrix(key) {
      if (entries.column <= 4) {
        entries.matrix[entries.row][entries.column] = key;
        const box = document.getElementById(`${entries.row}${entries.column}`);
        box.innerHTML = key;
        entries.column++;
        setEntries(entries);
      }
    }

    function UndoMatrix() {
      if (entries.column >= 0) {
        if (entries.column > 0) entries.column--;
        entries.matrix[entries.row][entries.column] = null;
        const box = document.getElementById(`${entries.row}${entries.column}`);
        box.innerHTML = "";
        setEntries(entries);
      }
    }

    function SubmitEntry() {
      if (entries.column === 5) {
        entries.column = 0;
        var correct = CheckWord(entries.row);
        if (correct || entries.row >= 5) {
          entries.done = true;
          var answer = document.getElementById("Answer");
          answer.style.color = "white";
          answer.innerHTML = entries.word;
          if (correct) {
            answer.style.backgroundColor = "forestgreen";
          } else {
            answer.style.backgroundColor = "gray";
          }
        }
        if (entries.row < 6) entries.row++;
        setEntries(entries);
      }
    }

    function ResetGame() {
      entries.matrix = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ];
      entries.row = 0;
      entries.column = 0;
      entries.done = false;
      setEntries(entries);
      SetWord();

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          var box = document.getElementById(`${i}${j}`);
          box.style.backgroundColor = "white";
          box.style.borderColor = "black";
          box.style.color = "black";
          box.innerHTML = "";
        }
      }

      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((e) => {
        var box = document.getElementById(e);
        box.style.backgroundColor = "rgb(230, 230, 230)";
        box.style.color = "black";
      });
      var answer = document.getElementById("Answer");
      answer.style.backgroundColor = "white";
      answer.innerHTML = "";
    }

    function SetWord() {
      entries.word = getRandomWord();
      setEntries(entries);
    }

    function CheckWord(row) {
      var isCorrect = true;
      var word = entries.word.toUpperCase();
      for (let i = 0; i < 5; i++) {
        var box = document.getElementById(`${row}${i}`);
        var letter = document.getElementById(entries.matrix[row][i]);
        box.style.color = "white";
        if (entries.matrix[row][i] === word[i]) {
          box.style.backgroundColor = "forestgreen";
          box.style.borderColor = "forestgreen";
          letter.style.backgroundColor = "forestgreen";
          letter.style.color = "white";
        } else if (word.includes(entries.matrix[row][i])) {
          box.style.backgroundColor = "goldenrod";
          box.style.borderColor = "goldenrod";
          if (letter.style.backgroundColor !== "forestgreen") {
            letter.style.backgroundColor = "goldenrod";
            letter.style.color = "white";
          }
          isCorrect = false;
        } else {
          box.style.backgroundColor = "gray";
          box.style.borderColor = "gray";
          letter.style.backgroundColor = "gray";
          letter.style.color = "white";
          isCorrect = false;
        }
      }
      return isCorrect;
    }

    const keyDownHandler = (event) => {
      if (entries.done) {
        ResetGame();
      } else {
        if (event.key === "Enter") {
          event.preventDefault();
          SubmitEntry();
        }
        if (event.key === "Backspace") {
          event.preventDefault();
          UndoMatrix();
        }
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          event.preventDefault();
          var key = event.key.toUpperCase();
          UpdateMatrix(key);
        }
      }
      console.log(
        `row: ${entries.row} col: ${entries.column} val: ${
          entries.matrix[entries.row]
        } word: ${entries.word}`
      );
    };

    SetWord();

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [entries]);

  return (
    <div className="HomePage">
      <div className="Header">
        <h1>
          <strong>My Wordle</strong>
        </h1>
      </div>
      <div className="Answer" id="Answer"></div>
      <div className="Attempts">
        <div className="Row">
          <div className="Box" id="00"></div>
          <div className="Box" id="01"></div>
          <div className="Box" id="02"></div>
          <div className="Box" id="03"></div>
          <div className="Box" id="04"></div>
        </div>
        <div className="Row">
          <div className="Box" id="10"></div>
          <div className="Box" id="11"></div>
          <div className="Box" id="12"></div>
          <div className="Box" id="13"></div>
          <div className="Box" id="14"></div>
        </div>
        <div className="Row">
          <div className="Box" id="20"></div>
          <div className="Box" id="21"></div>
          <div className="Box" id="22"></div>
          <div className="Box" id="23"></div>
          <div className="Box" id="24"></div>
        </div>
        <div className="Row">
          <div className="Box" id="30"></div>
          <div className="Box" id="31"></div>
          <div className="Box" id="32"></div>
          <div className="Box" id="33"></div>
          <div className="Box" id="34"></div>
        </div>
        <div className="Row">
          <div className="Box" id="40"></div>
          <div className="Box" id="41"></div>
          <div className="Box" id="42"></div>
          <div className="Box" id="43"></div>
          <div className="Box" id="44"></div>
        </div>
        <div className="Row">
          <div className="Box" id="50"></div>
          <div className="Box" id="51"></div>
          <div className="Box" id="52"></div>
          <div className="Box" id="53"></div>
          <div className="Box" id="54"></div>
        </div>
      </div>
      <div className="Keyboard">
        <div className="TopRow">
          <div className="Key" id="Q">
            Q
          </div>
          <div className="Key" id="W">
            W
          </div>
          <div className="Key" id="E">
            E
          </div>
          <div className="Key" id="R">
            R
          </div>
          <div className="Key" id="T">
            T
          </div>
          <div className="Key" id="Y">
            Y
          </div>
          <div className="Key" id="U">
            U
          </div>
          <div className="Key" id="I">
            I
          </div>
          <div className="Key" id="O">
            O
          </div>
          <div className="Key" id="P">
            P
          </div>
        </div>
        <div className="MiddleRow">
          <div className="Key" id="A">
            A
          </div>
          <div className="Key" id="S">
            S
          </div>
          <div className="Key" id="D">
            D
          </div>
          <div className="Key" id="F">
            F
          </div>
          <div className="Key" id="G">
            G
          </div>
          <div className="Key" id="H">
            H
          </div>
          <div className="Key" id="J">
            J
          </div>
          <div className="Key" id="K">
            K
          </div>
          <div className="Key" id="L">
            L
          </div>
        </div>
        <div className="BottomRow">
          <div className="OtherKey">Enter</div>
          <div className="Key" id="Z">
            Z
          </div>
          <div className="Key" id="X">
            X
          </div>
          <div className="Key" id="C">
            C
          </div>
          <div className="Key" id="V">
            V
          </div>
          <div className="Key" id="B">
            B
          </div>
          <div className="Key" id="N">
            N
          </div>
          <div className="Key" id="M">
            M
          </div>
          <div className="OtherKey">Back</div>
        </div>
      </div>
    </div>
  );
}

export default App;
