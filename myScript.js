const number = document.getElementById("Number");
const answer = document.querySelector(".Answer");
const guessed_numbers = document.querySelector(".guessed_numbers");
const Guesses_span = document.querySelector(".Guesses_span");
const revealAnswer = document.querySelector(".revealAnswer");
const revealSpan = document.querySelector(".revealSpan");
const restartButton = document.querySelector(".restartButton");

let randomNum = Math.floor(Math.random() * 100);
const button = document.querySelector(".btn");
const guess_es = [];

const MAX_GUESSES = 5;
let guessCount = 0;

// ── helper: lock UI when limit is hit ──────────────────────────────────────
const lockOnLimitReached = () => {
  number.disabled = true;
  number.value = "No more guesses! Reveal the answer or restart.";
  button.disabled = true;
  revealAnswer.disabled = false; // make sure reveal is available
  restartButton.style.display = "inline-block"; // show restart
  answer.textContent = `Game over! You used all ${MAX_GUESSES} guesses.`;
};

const buttonClick = (e) => {
  e.preventDefault();

  const guess = Number(number.value);

  if (isNaN(guess) || number.value.trim() === "") {
    answer.textContent = "Please enter a number!!!";
    return;
  }

  if (guess === randomNum) {
    answer.innerHTML = `<div class="win-message">🎉 Congratulations, You win! ${guess} is correct number! 🎉</div>`;

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
        document.body.appendChild(confetti);
      }, i * 30);
    }

    const emojis = ["🎯", "🏆", "✨", "👑", "💎"];
    emojis.forEach((emoji, i) => {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "emoji";
        el.textContent = emoji;
        el.style.left = `${Math.random() * 80 + 10}%`;
        el.style.animationDelay = `${i * 0.5}s`;
        document.body.appendChild(el);
      }, i * 300);
    });

    setTimeout(() => {
      document
        .querySelectorAll(".confetti, .emoji")
        .forEach((el) => el.remove());
    }, 5000);

    guessed_numbers.style.display = "none";
    revealAnswer.disabled = true;
    number.value = "You won! Restart game to play again";
    number.disabled = true;
    button.disabled = true;
    restartButton.style.display = "inline-block"; // show restart on win too
    randomNum = Math.floor(Math.random() * 100);
    guess_es.length = 0;
    guessCount = 0;
  } else {
    // Wrong guess
    guessCount++;
    const remaining = MAX_GUESSES - guessCount;

    if (guess > randomNum) {
      answer.textContent =
        remaining > 0
          ? `You guessed high — ${remaining} guess${remaining === 1 ? "" : "es"} left`
          : "You guessed high.";
    } else {
      answer.textContent =
        remaining > 0
          ? `You guessed low — ${remaining} guess${remaining === 1 ? "" : "es"} left`
          : "You guessed low.";
    }

    number.value = "";
    guess_es.push(guess);
    Guesses_span.textContent = guess_es.join(", ");

    if (guessCount >= MAX_GUESSES) {
      lockOnLimitReached();
    }
  }
};

button.addEventListener("click", buttonClick);

const onEnter = (event) => {
  if (event.key.toLowerCase() === "enter") {
    event.preventDefault();
    button.click();
  }
};

number.addEventListener("keypress", onEnter);

revealAnswer.addEventListener("click", () => {
  revealAnswer.textContent = randomNum;
  number.value = "You revealed the number. Restart to play again.";
  guessed_numbers.style.display = "none";
  answer.textContent = "";
  number.disabled = true;
  button.disabled = true;
  restartButton.style.display = "inline-block";
  revealSpan.textContent =
    "Number revealed: You lost the game. Restart to play again";
});

restartButton.addEventListener("click", () => {
  number.value = "";
  revealAnswer.textContent = "Reveal Number";
  revealAnswer.disabled = false;
  revealSpan.textContent = "";
  guessed_numbers.style.display = "block";
  Guesses_span.textContent = "";
  guess_es.length = 0;
  guessCount = 0; // ← reset counter
  number.disabled = false;
  button.disabled = false;
  answer.textContent = "";
  restartButton.style.display = "none"; // ← hide restart again
  randomNum = Math.round(Math.random() * 100);
});
