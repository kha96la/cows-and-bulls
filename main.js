let fourBulls = generateRandomNumber();
function generateRandomNumber(digits = 4) {
        if (digits > 10) {
          return;
        }
        const numArr = [];
        numArr.push(Math.floor(Math.random() * 10));

        while (numArr.length < digits) {
          let newNum = Math.floor(Math.random() * 10);
          while (numArr.indexOf(newNum) > -1) {
            newNum = Math.floor(Math.random() * 10);
          }
          numArr.push(newNum);
        }
        return numArr.join("");
      }

      let correctGuess = false;
      const pastGuesses = document.getElementById("past-guesses");
      const guessForm = document.getElementById("guess");
      const guessInput = document.getElementById("guess-input");

      const fourDigitNumRegex = /^\d{4}$/;
      guessForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (fourDigitNumRegex.test(guessInput.value)) {
          const guessCheckResult = checkGuess(fourBulls, guessInput.value);
          if (guessCheckResult.bulls === 4) {
            correctGuess = true;
            playAnother.classList.toggle("hidden");
            guessForm.classList.toggle("hidden")
          }

          const bullsAndCowsStr = genBullsAndCowsString(guessCheckResult);
          const guessText = document.createTextNode(
            `${guessInput.value} · ${bullsAndCowsStr}`
          );
          const guessElement = document.createElement("div");
          guessElement.appendChild(guessText);
          pastGuesses.append(guessElement);
          guessInput.value = "";
        }
      });

      function checkGuess(targetGuess, currentGuess) {
        let bulls = 0;
        let cows = 0;
        for (const i in currentGuess) {
          if (targetGuess[i] === currentGuess[i]) {
            bulls++;
          } else if (targetGuess.indexOf(currentGuess[i]) > -1) {
            cows++;
          }
        }
        return { bulls, cows };
      }

      function genBullsAndCowsString(bullsAndCowsObj) {
        return `${bullsAndCowsObj.bulls}B ${bullsAndCowsObj.cows}C`;
      }




