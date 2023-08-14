// Create the letters
let lettersContainer = document.querySelector(".letters");

let letters = "abcdefghijklmnopqrstuvwxyz-";
letters = Array.from(letters);

letters.forEach((letter) => {
  let div = document.createElement("div");
  let textNode = document.createTextNode(letter);
  div.classList = "letter";
  div.appendChild(textNode);
  lettersContainer.appendChild(div);
});

const categories = {
  fruits: [
    "apple",
    "banana",
    "cherry",
    "grabes",
    "mango",
    "strewberry",
    "watermellon",
    "peach",
    "pear",
    "Pinapple",
    "",
  ],
  clothes: ["t-shirt", "tie", "botie", "pear of pans", "boot"],
  transports: [
    "car",
    "taxi",
    "bus",
    "truch",
    "motocycle",
    "cycle",
    "subway",
    "ship",
  ],
};

// Create the random word and put its category into the title

let allCategorysName = Object.keys(categories);
let ranCateInd = Math.floor(Math.random() * allCategorysName.length);

// Random category name
let ranCateName = allCategorysName[ranCateInd];

let ranCateProps = categories[ranCateName];
let ranWordInd = Math.floor(Math.random() * ranCateProps.length);

// The random word
let ranWordVal = ranCateProps[ranWordInd];

// Add categroy's name to the title
const titleSpan = document.querySelector("#word span");
titleSpan.innerHTML = ranCateName;

// Create correct char's spans
let correctChars = document.querySelector(".correct-chars");
const arrayFRanWord = Array.from(ranWordVal);

arrayFRanWord.forEach((letter) => {
  let span = document.createElement("span");
  if (letter !== " ") {
    span.className = "char";
  } else {
    span.className = "char space";
  }
  correctChars.appendChild(span);
});

// Add click event on key's letters
let lettersEles = document.querySelectorAll(".letter");
let charSpans = document.querySelectorAll(".char");
let hangShap = document.querySelector(".hang-shap");

// The wrongs
let wrongs = 0;

// The rights

lettersEles.forEach((letterEle) => {
  let theStatus = false;
  letterEle.addEventListener("click", (e) => {
    let clickedLetter = e.target.innerHTML.toLowerCase();
    e.target.classList.add("active");
    arrayFRanWord.forEach((char, indexC) => {
      if (clickedLetter === char) {
        theStatus = true;
        charSpans.forEach((span, indexS) => {
          if (indexS === indexC) {
            span.appendChild(document.createTextNode(char));
          }
        });
      }
    });
    if (!theStatus) {
      wrongs++;
      hangShap.classList.add(`wrong-${wrongs}`);
      document.querySelector("#fail").play();
      if (wrongs === 7) {
        endGame();
        lettersContainer.classList.add("end");
      }
    } else {
      document.querySelector("#success").play();
      let rights = 0;
      charSpans.forEach((span) => {
        if (span.classList.contains("space")) {
          rights++;
        } else if (span.innerHTML !== "") {
          rights++;
        }
      });
      if (rights === ranWordVal.length) {
        successFn();
      }
    }
  });
});

function endGame() {
  // gameOver popup
  let p = document.createElement("p");
  p.className = "game-over";
  p.appendChild(
    document.createTextNode(`Game over, the word is: ${ranWordVal}`)
  );
  document.body.appendChild(p);
  setTimeout(() => {
    document.location.reload();
  }, 2500);
}

function successFn() {
  // Win Pupup
  let p = document.createElement("p");
  p.className = "success-par";
  p.appendChild(
    document.createTextNode(`Congratulation your wrongs are: ${wrongs}`)
  );
  document.body.appendChild(p);
  setTimeout(() => {
    document.location.reload();
  }, 2500);
}
