const words = [
  "apple", "banana", "grape", "orange", "peach",
  "watermelon", "strawberry", "pineapple", "kiwi",
  "avocado", "papaya", "cherry", "jackfruit", "lemon"
];

let secretWord;
let attemptsLeft;
let incorrectAttempts = 0;

function getRandomWord(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function makeGuess() {
  const guessInput = document.getElementById("guessInput").value.trim().toLowerCase();
  const messageDiv = document.getElementById("message");
  
  if (guessInput === "") {
    messageDiv.textContent = `Please enter a guess. You have ${attemptsLeft} attempts left.`;
    messageDiv.className = "incorrect";
    return;
  }
  
  if (guessInput === secretWord) {
    messageDiv.textContent = "Congratulations! You guessed the secret word!";
    messageDiv.className = "correct";
    document.body.style.backgroundColor = "lightgreen";
    document.getElementById("restartGame").style.display = "inline";
  } else {
    incorrectAttempts++; 
    attemptsLeft--;
    if (attemptsLeft > 0) {
      messageDiv.textContent = `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`;
      messageDiv.className = "incorrect";
      
      if (incorrectAttempts === 2) {
        displayClue(); 
      }
    } else {
      messageDiv.textContent = `Game over! The secret word was '${secretWord}'.`;
      messageDiv.className = "incorrect";
      document.body.style.backgroundColor = "lightcoral";
      document.getElementById("restartGame").style.display = "inline";
    }
  }
  document.getElementById("guessInput").value = "";
}

function restartGame() {
  secretWord = getRandomWord(words);
  attemptsLeft = 5;
  incorrectAttempts = 0; 
  document.getElementById("message").textContent = "";
  document.getElementById("guessInput").value = "";
  document.body.style.backgroundColor = "";
  document.getElementById("restartGame").style.display = "none";
  
  const clueDiv = document.getElementById("clue");
  clueDiv.textContent = "";
}

function displayClue() {
  const clueDiv = document.getElementById("clue");
  clueDiv.textContent = `The word starts with '${secretWord.charAt(0).toUpperCase()}'`;
}

secretWord = getRandomWord(words);
attemptsLeft = 5;

document.getElementById("submitGuess").addEventListener("click", makeGuess);
document.getElementById("restartGame").addEventListener("click", restartGame);

document.getElementById("guessInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    makeGuess();
  }
});
