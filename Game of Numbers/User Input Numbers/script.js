const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const refreshButton = document.getElementById('refresh-button');
const errorMessageElement = document.getElementById('error-message');

let numbers = [];
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
    button.className = 'number-button';
    button.innerText = number;
    button.onclick = () => onButtonClick(number, button);
    return button;
}

function onButtonClick(number, button) {
    if (number === currentNumber) {
        currentNumber++;
        button.disabled = true;
        button.style.backgroundColor = 'lightgray';

        if (currentNumber > Math.max(...numbers)) {
            clearInterval(timerInterval);
            messageElement.innerText = 'You Win!';
            refreshButton.style.display = 'block';
        }
    }
}

function startGame(start, end) {
    gameBoard.innerHTML = ''; // Clear the board
    numbers = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    shuffledNumbers = shuffleArray([...numbers]);
    currentNumber = start;
    timeRemaining = 60;
    timerElement.innerText = `Time: ${timeRemaining}`;
    messageElement.innerText = '';
    errorMessageElement.innerText = '';
    refreshButton.style.display = 'none';

    // Determine the number of columns based on the number of buttons
    const columns = Math.ceil(Math.sqrt(numbers.length));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

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
            document.querySelectorAll('.number-button').forEach(button => button.disabled = true);
            refreshButton.style.display = 'block';
        }
    }, 1000);
}

function initializeGame() {
    const startNumber = parseInt(document.getElementById('start-number').value, 10);
    const endNumber = parseInt(document.getElementById('end-number').value, 10);

    if (isNaN(startNumber) || isNaN(endNumber)) {
        errorMessageElement.innerText = 'Please enter valid numbers.';
        return;
    }

    const range = endNumber - startNumber + 1;
    if (range < 20 || range > 40) {
        errorMessageElement.innerText = 'Please enter a range of numbers between 20 and 40.';
        return;
    }

    startGame(startNumber, endNumber);
}

function refreshGame() {
    initializeGame();
}
