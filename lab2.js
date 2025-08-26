const num = Math.floor(Math.random() * 100) + 1;
const button = document.getElementById("click-button");
const resultField = document.getElementById("result");
const guessNumField = document.getElementById("guesses");
let numOfGuesses = 0;
console.log(num);

document.getElementById('click-button').addEventListener('click', evt => {
    let data = document.getElementById('my_input').value;
    if(data < 1 || data > 100 || isNaN(data)) {
        resultField.textContent = "Invalid number/input!"
        document.getElementById('my_input').value = ""; 
    }
    else {
        resultField.innerHTML = getResult(data);
        numOfGuesses +=1;
        guessNumField.textContent = numOfGuesses;
    }
});

function getResult(data) {
    if(data == num) {
        return "Correct! The number is " + num +
            "<br><img src='thumbs-thumbs-up-kid.gif' alt='Success!' width='200'>";
    }
    else if(data < num) {
        return "Incorrect, too low."
    }
    else {
        return "Incorrect, too high."
    }
}
