const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const refreshButton = document.getElementById('refresh-button');

let numbers = Array.from({ length: 20}, (_, i) => i + 1);
let shuffledNumbers;
let currentNumber;
let timeRemaining;
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createButton(number) {
    const button = document.createElement('button');
    button.innerText = number;
    button.onclick = () => onButtonClick(number, button);
    return button;
}

function onButtonClick(number, button) {
    if (number === currentNumber) {
        currentNumber++;
        button.disabled = true;
        button.style.backgroundColor = 'lightgray';

        if (currentNumber > 20) {
            clearInterval(timerInterval);
            messageElement.innerText = 'You Win!';
            refreshButton.style.display = 'block';
        }
    }
}

function startGame() {
    gameBoard.innerHTML = ''; // Clear the board
    shuffledNumbers = shuffleArray([...numbers]);
    currentNumber = 1;
    timeRemaining = 60;
    timerElement.innerText = `Time: ${timeRemaining}`;
    messageElement.innerText = '';
    refreshButton.style.display = 'none';

    shuffledNumbers.forEach(number => {
        const button = createButton(number);
        gameBoard.appendChild(button);
    });

    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Time: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            messageElement.innerText = 'Game Over';
            document.querySelectorAll('button').forEach(button => button.disabled = true);
            refreshButton.style.display = 'block';
        }
    }, 1000);
}

function refreshGame() {
    startGame();
}

startGame();
