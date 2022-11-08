'use strict';

const guessedNumberEl = document.getElementById('guess'); // Input box
const btnCheck = document.getElementById('guessBtn'); // Click button
const message = document.getElementById('message'); // display
const labelScoreEl = document.getElementById('labelScore');
const highScoreEl = document.getElementById('highScore');
const totalGuessEl = document.getElementById('totalGuess'); // Count that guessed
const secretNumberBtnEl = document.getElementById('secretNumberBtn');

let score = 20;
let i = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = localStorage.getItem('highScore') != null ? localStorage.getItem('highScore') : 0;

function init() {
    labelScoreEl.innerText = score;
    highScoreEl.innerText = highScore;
}

// Common function to display error or success message with text color
function displayMessage(text, type) {
    message.innerText = text;
    message.style.color = (type == 'success') ? 'var(--success-text)' : 'var(--error-text)';
}

btnCheck.addEventListener('click', function () {
    const guess = Math.round(Number(guessedNumberEl.value));

    if (score > 1) {
        if (!guess || guess < 0) {
            displayMessage('Enter a valid number between 1-20', 'error');
        } else {
            if (guess === secretNumber) {
                displayMessage('Correct Number! 🙌', 'success');
                secretNumberBtnEl.classList.add('rotate-scale-up');
                secretNumberBtnEl.innerText = guess;

                // Update the highscore display and storage, if current score is greater than old high score
                if(score > highScore) {
                    highScoreEl.innerText = score;
                    localStorage.setItem('highScore', score);
                }
            } else if (guess > secretNumber) {
                displayMessage('Too high!', 'error');
                score--
            } else if (guess < secretNumber) {
                displayMessage('Too low!', 'error');
                score--
            }
            
            i++;
            totalGuessEl.innerText = i;
            labelScoreEl.innerText = score;
        }
    } else {
        displayMessage('You lost the game! 🙁', 'error');
    }

    guessedNumberEl.value = null;
});

init();