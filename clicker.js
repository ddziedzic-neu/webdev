// Click me game

let score = 0;
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("click-button");

clickButton.addEventListener("click", () => {
    score += 1;
    scoreDisplay.textContent = score;
});

// RPS game

const choices = ['rock', 'paper', 'scissors'];
const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("rps-result");

document.querySelectorAll(".rps").forEach((button) => {
    button.addEventListener("click", () => {
        const playerChoice = button.dataset.choice;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        playerChoiceDisplay.textContent = playerChoice;
        computerChoiceDisplay.textContent = computerChoice;
        resultDisplay.textContent = getResult(playerChoice, computerChoice);
    });
});

function getResult(player, computer) {
    if(player === computer) {
        return "Tie!"
    }
    
    if(
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")) 
    {
        return "You win!"
    }
    else {
        return "You lose!"
    }
}