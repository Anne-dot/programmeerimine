console.log('Javascript is running');

document.addEventListener('DOMContentLoaded', () => {
    const wordDiv = document.getElementById('word');
    const scoreDiv = document.getElementById('score');
    const messageDiv = document.getElementById('message');
    const alphabetDiv = document.getElementById('alphabet');


    let score = 10;

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'õ', 'ä', 'ö', 'ü', 'x', 'y', 'z'];
    const guessedLetters = [];

    //hiljem sõna API kaudu
    let word = 'KURESSAARE AMETIKOOL';


    // muudab tähed alakriipsudeks
    let guess = word.replace(/[a-zA-Z]/g, "_");

    alphabet.forEach(c => {
        const letterDiv = document.createElement('div');
        letterDiv.setAttribute('id', c);
        letterDiv.classList.add('letter');
        letterDiv.innerText = c.toUpperCase();

        alphabetDiv.appendChild(letterDiv);
    });


    wordDiv.innerText = guess;
    scoreDiv.innerText = score;

    console.log('Script loaded');
})




//JS kuulab, mis klahvi kasutaja vajutab, saab näha Inspector -> Console all kui vajutatud ja töötab
document.addEventListener('keydown', e => {
    let letter = e.key;

    if (alphabet.includes(letter) && !guessedLetters.includes(letter) && score != 0) {

        guessedLetters.push(letter);

        if (word.includes(letter.toUpperCase())) {

            // i on tähe indeks
            let i = -1;
            let guessArray = guess.split('');
            // do while teeb enne ühe tingimuse, siis kontrollib
            do {
                i = word.indexOf(letter.toUpperCase(), i + 1);
                guessArray[i] = letter.toUpperCase();
            } while (i != -1);
            guess = guessArray.join('');
            console.log(guess);
            wordDiv.innerText = guess;

            if (!guess.includes('_')) {
                messageDiv.innerText = 'Arvasid ära!';
            }

            // console.log(word.matchAll('A'));
            // //guess = guess.replace(letter, );
            // console.log(letter);
        } else {
            score--;
            scoreDiv.innerText = score;

            if (!score) {
                messageDiv.innerText = 'Mäng läbi!';
            }
        }
    };
});