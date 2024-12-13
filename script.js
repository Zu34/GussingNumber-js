// DOM elements
const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  checkButton = document.querySelector("button"),
  remainChances = document.querySelector(".chances"),
  historyBox = document.querySelector(".history"); 

// Random number between 1 and 99
const createRandomNumber = () => Math.floor(Math.random() * 99) + 1;
let random_Num = createRandomNumber();
let Og_chance = 10;

let inputHistory = [];

input.focus();

historyBox.style.display = "none";

// reset the game
const ResetGame = () => {
  random_Num = createRandomNumber();
  Og_chance = 10;
  inputHistory = []; // Clear input history
  input.disabled = false;
  remainChances.textContent = Og_chance;
  guess.textContent = "";
  guess.style.color = "#333";
  input.value = "";
  checkButton.textContent = "Check";
  historyBox.innerHTML = ""; 
  historyBox.style.display = "none"; 
};


const clearInputBox = () => {
  input.value = "";
};

//  the history box logic and styling
const update_History = () => {
  historyBox.style.display = "block";
  historyBox.innerHTML = ""; 
  inputHistory.forEach((guess, index) => {
    const guessElement = document.createElement("div");
    guessElement.textContent = `Guess ${index + 1}: ${guess}`;
    guessElement.style.margin = "5px 0"; 
    guessElement.style.fontSize = "14px";
    guessElement.style.color = "#333";
    historyBox.appendChild(guessElement);
  });
};


const handle_Outcome = (message, color, isGameOver = false) => {
  guess.textContent = message;
  guess.style.color = color;

  if (isGameOver) {
    input.disabled = true;
    checkButton.textContent = "Replay";
  }
};

//  return all user input 
const getInputHistory = () => inputHistory;

checkButton.addEventListener("click", () => {
  if (input.disabled) {
    ResetGame();
    return;
  }

  const inputValue = parseInt(input.value, 10);
  // Validate input
  if (isNaN(inputValue) || inputValue < 1 || inputValue > 99) {
    handle_Outcome("Please enter a valid number between 1 and 99.", "#e74c3c");
    clearInputBox();
    return;
  }

  // Add input to history
  inputHistory.push(inputValue);

  update_History();
  Og_chance--;
  remainChances.textContent = Og_chance;

  // Check outcomes
  if (inputValue === random_Num) {
    handle_Outcome("Congrats! You found the number 🤩🎉", "#27ae60", true);
  } else if (Og_chance === 0) {
    handle_Outcome("You lost the game.☠️", "#e74c3c", true);
  } else {
    const hint = inputValue > random_Num ? "Your guess is too high 😒." : "Your guess is too low!!!😔.";
    const hintColor = inputValue > random_Num ? "#333" : "#f60505";
    handle_Outcome(hint, hintColor);
    clearInputBox();
  }
});
