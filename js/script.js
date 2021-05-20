//The unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//The button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingGuessesParagraph = document.querySelector(".remaining")
//The span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter
const messageToPlayer = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector("play-again");

//Starting word to test out the game
const word = "magnolia";

//Guess letters array
const guessedLettersArray = [];


//function to creat placeholders for each letter in the word
const createLetterPlaceholders = function (word) {
    const wordArray = [];
    for (let letter of word){
        wordArray.push(`●`);
    }
    wordInProgress.innerText = wordArray.join("");

};

createLetterPlaceholders(word);

//guess button event listern
guessButton.addEventListener("click", function (e){
    e.preventDefault();
    const inputValue = letterInput.value;
    // console.log(inputValue);
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
    console.log(letter);
    if (guessedLettersArray.includes(letter)) {
        messageToPlayer.innerText = "You already guessed that letter. Try again";
        letterInput.value = "";
    } else {
        guessedLettersArray.push(letter);
        showGuessedLetter(letter);
    }
    console.log(guessedLettersArray);
}

//function to show the guessed letters
const showGuessedLetter = function (letter) {
    // guessedLetters.innerHTML = "";
    let li = document.createElement("li");
    li.innerHTML = `${letter}`;
    guessedLetters.appendChild(li);
    letterInput.value = "";
}








