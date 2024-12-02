// ühendab HTML-i ID-ga
const wordDiv = document.getElementById('word');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');
const alphabetDiv = document.getElementById('alphabet');
const hangmanImageDiv = document.getElementById('hangmanImage')


//arvamiste kord
let score = 10;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'õ', 'ä', 'ö', 'ü', 'x', 'y', 'z'];
let guessedLetters = [];

// poomismängu pildid
const hangmanVisuals = [
    "images/stage00.png",
    "images/stage01.png",
    "images/stage02.png",
    "images/stage03.png",
    "images/stage04.png",
    "images/stage05.png",
    "images/stage06.png",
    "images/stage07.png",
    "images/stage08.png",
    "images/stage09.png",
    "images/stage10.png"
]
// lae algne pilt
let imageIndex = 0;

// hangman = hangmanImageDiv.innerText(hangmanVisuals[0]);

//hiljem sõna API kaudu
let word = await getRandomWord();
console.log(word);

// muudab tähed alakriipsudeks
let guess = word.replace(/[ABDEFGHIJKLMNOPQRSŠZŽTUVÕÄÖÜ]/g, "_");



alphabet.forEach(c => {
    const letterDiv = document.createElement('div');
    letterDiv.setAttribute('id', c);
    letterDiv.classList.add('letter');
    letterDiv.innerText = c.toUpperCase();

    letterDiv.addEventListener('click', e => {
        testLetter(c);
    }),

        alphabetDiv.appendChild(letterDiv);
});



wordDiv.innerText = guess;
scoreDiv.innerText = score;


//JS kuulab, mis klahvi kasutaja vajutab, saab näha Inspector -> Console all kui vajutatud ja töötab
document.addEventListener('keydown', e => {
    testLetter(e.key);
});

function testLetter(letter) {



    // võib ära jätta score !=0, sest score peab olema true ja 0 on false
    if (alphabet.includes(letter) && !guessedLetters.includes(letter) && score != 0) {

        guessedLetters.push(letter);
        
        const guessedLetterDiv = document.getElementById(letter);

        if (word.includes(letter.toUpperCase())) {

            // i on tähe indeks
            let i = -1;
            let guessArray = guess.split("");

            // do while teeb enne ühe tingimuse, siis kontrollib
            do {
                i = word.indexOf(letter.toUpperCase(), i + 1);
                guessArray[i] = letter.toUpperCase();
                console.log(i);
            } while (i != -1);
            guess = guessArray.join('');
            console.log(guess);
            wordDiv.innerText = guess;
            //kui sõnas pole enam alakriipse
            if (!guess.includes('_')) {
                messageDiv.innerText = "Arvasid ära!";

            }
            guessedLetterDiv.classList.add('correct-letter');

        } else {
            score--;
            scoreDiv.innerText = score;

            imageIndex++;
            hangmanImageDiv.src = hangmanVisuals[imageIndex];

            if (!score) {
                messageDiv.innerText = "Mäng läbi! \n Õige sõna oli " + word;
            }

            guessedLetterDiv.classList.add('wrong-letter');
        }

    };
};

async function getRandomWord() {
    const response = await fetch('hangman.txt');
    let words = await response.text();

    words = words.split('\n');
    const word = words[Math.floor(Math.random() * words.length)];



    return word.toUpperCase();

}

