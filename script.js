const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'javascript',
  'asyncronous',
  'programming',
  'application',
  'promises',
  'callback',
];

const selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Shows the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
            <span class = "letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
      )
      .join('')}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations!! You Won!';
    popup.style.display = 'flex';
  }
}

//Update wrong letters
function updateWrongLetters() {
  //display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(
      letter => `<span>
      ${wrongLetters.includes(letter) ? letter : ''} 
      </span>
      `
    )}
  `;

  //draw figure
  figureParts.forEach((parts, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      parts.style.display = 'block';
    } else parts.style.display = 'none';
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you have lost.';
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e => {
  //console.log(e.key);

  if (/^[A-Za-z]$/.test(e.key)) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

//Play Again functionality

playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  const selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetters();

  popup.style.display = 'none';
});

displayWord();
