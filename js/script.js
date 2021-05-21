//The unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//The button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingGuessesParagraph = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter
const messageToPlayer = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

//Starting word to test out the game
let word;

//the letters a player guesses
let guessedLettersArray = [];

//remaining guesses
let remainingGuesses = 8;

const getWord = async function () {
    const showRequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await showRequest.text();
    const wordArray = data.split("\n");
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    createLetterPlaceholders(word);
};

getWord();

//function to creat placeholders for each letter in the word
const createLetterPlaceholders = function (word) {
    const placeholderLetters = [];
        for (let letter of word){
            placeholderLetters.push(`●`);
        }
    wordInProgress.innerText = placeholderLetters.join("");
};

//should this go here?
guessedLetters.innerHTML = "";

//guess button event listern
guessButton.addEventListener("click", function (e){
    e.preventDefault();
    messageToPlayer.innerText = "";
    const inputValue = letterInput.value;
    validateInput(inputValue);
});

//function to validate letter guess
const validateInput = function (inputValue) {
    const acceptedLetter = /[a-zA-Z]/;
    if(inputValue === ""){
        messageToPlayer.innerText = "You need to input A letter";
    }
    else if (inputValue.length > 1) {
        messageToPlayer.innerText = "You need to input ONE letter";
        letterInput.value = "";
    }
    else if (!inputValue.match(acceptedLetter)) {
        messageToPlayer.innerText = "You need to input ONE ACUTAL letter";
        letterInput.value = "";
    } else {
        makeGuess(inputValue);
    }
};

//function to accept the validated, validate it is a new letter and add it to the guessedLettersArray
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLettersArray.includes(letter)) {
        messageToPlayer.innerText = "You already guessed that letter. Try again";
        letterInput.value = "";
    } else {
        guessedLettersArray.push(letter);
        showGuessedLetter(letter);
        countGuesses(letter);
        updatedWordInProgress(guessedLettersArray);
    }
};

//function to show the guessed letters
const showGuessedLetter = function (letter) {
    let li = document.createElement("li");
    li.innerHTML = `${letter}`;
    guessedLetters.append(li);
    letterInput.value = "";
};

//function to update the word in progress
const updatedWordInProgress = function (array) {
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");
const inProgressWordArray = [];
wordArray.forEach( function (element, index){
        if (array.includes(element)) {
            inProgressWordArray.push(element);
        }
        else {
            inProgressWordArray.push(`●`);
        }
    });
wordInProgress.innerText = inProgressWordArray.join("");
playerWon(wordArray, inProgressWordArray);
};

//function to count guesses remaining
const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        messageToPlayer.innerText = `Good guess! The word has the letter ${guess}`;
    } else {
        messageToPlayer.innerText = `Sorry! The word has no letter ${guess}`;
        remainingGuesses -= 1;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
    if (remainingGuesses === 0){
        messageToPlayer.innerText = `GAME OVER! The word was ${wordUpper}`;
        startOver();
    }
};

//function to check if player won
const playerWon = function (arrayOne, arrayTwo) {
    if (arrayOne.join() === arrayTwo.join()){
        messageToPlayer.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

//function to show and hide elements
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//play again button click handler
playAgainButton.addEventListener("click", function () {
    messageToPlayer.innerText = "";
    guessedLetters.innerText = "";
    guessedLettersArray = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});








