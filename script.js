
//  DOM elements
const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  checkButton = document.querySelector("button"),
  remainChances = document.querySelector(".chances");

// random number between 1 and 99
const createRandomNumber = () => Math.floor(Math.random() * 99) + 1;
let random_Num = createRandomNumber();
let Og_chance = 10;

// Set  'focus' on the input field
input.focus();

// Function to reset the game
const ResetGame = () => {
  random_Num = createRandomNumber();
  Og_chance = 10;
  input.disabled = false;
  remainChances.textContent = Og_chance;
  guess.textContent = "";
  guess.style.color = "#333";
  input.value = "";
  checkButton.textContent = "Check";
};

// Function to clear the input box
const clearInputBox = () => {
  input.value = "";
};

// Function to handle guess!!
const handle_Outcome = (message, color, isGameOver = false) => {
  // Update the message and color
  guess.textContent = message;
  guess.style.color = color;

  if (isGameOver) {
    input.disabled = true;
    checkButton.textContent = "Replay";
  }
};

//  click event-listener to the check button
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

  // Update chances and display
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

