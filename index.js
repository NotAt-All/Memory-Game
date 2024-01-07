const emojis = [
  "😎",
  "😎",
  "😍",
  "😍",
  "❤️",
  "❤️",
  "😭",
  "😭",
  "👻",
  "👻",
  "🥹",
  "🥹",
  "🤬",
  "🤬",
  "😇",
  "😇",
];

let openedBoxes = [];
let matchedPairs = [];
let shuf_emojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));

function resetGame() {
  openedBoxes = [];
  matchedPairs = [];
  document.querySelectorAll(".item").forEach((box) => {
    box.classList.remove("boxOpen", "matched");
  });
  shuffleEmojis();
}

function shuffleEmojis() {
  shuf_emojis = shuf_emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
  document.querySelectorAll(".item").forEach((box, i) => {
    box.innerHTML = shuf_emojis[i];
  });
}

function checkMatch() {
  if (openedBoxes.length === 2) {
    const [box1, box2] = openedBoxes;
    if (box1.innerHTML === box2.innerHTML) {
      box1.classList.add("matched");
      box2.classList.add("matched");
      matchedPairs.push(box1.innerHTML);
      if (matchedPairs.length === emojis.length / 2) {
        setTimeout(() => {
          alert("Congratulations! You've matched all pairs!");
          resetGame();
        }, 500);
      }
    } else {
      setTimeout(() => {
        box1.classList.remove("boxOpen");
        box2.classList.remove("boxOpen");
      }, 500);
    }
    openedBoxes = [];
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.querySelector(".game");

  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuf_emojis[i];

    box.addEventListener("click", function () {
      if (!box.classList.contains("boxOpen") && openedBoxes.length < 2) {
        box.classList.add("boxOpen");
        openedBoxes.push(box);
        checkMatch();
      }
    });

    gameContainer.appendChild(box);
  }

  shuffleEmojis();
});

document.querySelector(".reset").addEventListener("click", resetGame);
