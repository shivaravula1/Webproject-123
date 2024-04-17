const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

let isFirstMove = true;

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  const allBoxes = document.querySelectorAll('#grid div');

  if (isFirstMove) {
    const centerIndex = 5;
    const centerBox = allBoxes[centerIndex];
    if (freeBoxes.includes(centerBox)) {
      assignSpace(centerBox, 'o');
      isFirstMove = false;
      if (isGameOver()) {
        displayWinner();
      }
      return;
    }
  }
  for (const move of winningMoves) {
    const [a, b, c] = move;
    if (takenBoxes[a] === 'x' && takenBoxes[b] === 'x' && freeBoxes.includes(allBoxes[c])) {
      assignSpace(allBoxes[c], 'o');
      if (isGameOver()) {
        displayWinner();
        return;
      } else {
        return;
      }
    }
    if (takenBoxes[a] === 'x' && takenBoxes[c] === 'x' && freeBoxes.includes(allBoxes[b])) {
      assignSpace(allBoxes[b], 'o');
      if (isGameOver()) {
        displayWinner();
        return;
      } else {
        return;
      }
    }
    if (takenBoxes[b] === 'x' && takenBoxes[c] === 'x' && freeBoxes.includes(allBoxes[a])) {
      assignSpace(allBoxes[a], 'o');
      if (isGameOver()) {
        displayWinner();
        return;
      } else {
        return;
      }
    }
  }
  for (const move of winningMoves) {
    const [a, b, c] = move;
    if (takenBoxes[a] === 'o' && takenBoxes[b] === 'o' && freeBoxes.includes(allBoxes[c])) {
      assignSpace(allBoxes[c], 'o');
      if (isGameOver()) {
        displayWinner();
        return;
      } else {
        return;
      }
    }
    if (takenBoxes[a] === 'o' && takenBoxes[c] === 'o' && freeBoxes.includes(allBoxes[b])) {
      assignSpace(allBoxes[b], 'o');
      if (isGameOver()) {
        displayWinner();
        return;
      } else {
        return;
      }
    }
    if (takenBoxes[b] === 'o' && takenBoxes[c] === 'o' && freeBoxes.includes(allBoxes[a])) {
      assignSpace(allBoxes[a], 'o');
      if (isGameOver()) {
        displayWinner();
        return;
      } else {
        return;
      }
    }
  }
  const corners = [0, 3, 12, 15];
  const edges = [1, 2, 4, 7, 8, 11, 5, 6, 9, 10, 13, 14];
  const centerIndex = 5;
  for (const cornerIndex of corners) {
    if (freeBoxes.includes(allBoxes[cornerIndex])) {
      assignSpace(allBoxes[cornerIndex], 'o');
      if (isGameOver()) {
        displayWinner();
      }
      return;
    }
  }
  if (freeBoxes.includes(allBoxes[centerIndex])) {
    assignSpace(allBoxes[centerIndex], 'o');
    if (isGameOver()) {
      displayWinner();
    }
    return;
  }
  for (const edgeIndex of edges) {
    if (freeBoxes.includes(allBoxes[edgeIndex])) {
      assignSpace(allBoxes[edgeIndex], 'o');
      if (isGameOver()) {
        displayWinner();
      }
      return;
    }
  }
}
function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    alert("Congratulations You Win!")
  } else if (winner === 'o') {
    alert("Sorry, Computer won Try Next Time!")
  } else {
    alert("Oops Its a Tie, Try Next Time!");
  }
  resultContainer.appendChild(header);

  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

function getWinner() {
  let result = checkBoxes(0, 1, 2) ||
               checkBoxes(4, 5, 6) ||
               checkBoxes(8, 9, 10) ||
               checkBoxes(12, 13, 14) ||
               checkBoxes(1, 2, 3) ||
               checkBoxes(5, 6, 7) ||
               checkBoxes(9, 10, 11) ||
               checkBoxes(13, 14, 15) ||
               checkBoxes(0, 4, 8) ||
               checkBoxes(1, 5, 9) ||
               checkBoxes(2, 6, 10) ||
               checkBoxes(3, 7, 11) ||
               checkBoxes(7, 11, 15) ||
               checkBoxes(4, 8, 12) ||
               checkBoxes(5, 9, 13) ||
               checkBoxes(6, 10, 14);
  if (result) {
    return result;
  }
  return checkBoxes(0, 5, 10) ||
         checkBoxes(1, 6, 11) ||
         checkBoxes(4, 9, 14) ||
         checkBoxes(5, 10, 15) ||
         checkBoxes(8, 5, 2) ||
         checkBoxes(9, 6, 3) ||
         checkBoxes(12, 9, 6) ||
         checkBoxes(6, 9, 12) ||
         checkBoxes(13, 10, 7);
}

const winningMoves = [
  [0, 1, 2], [4, 5, 6], [8, 9, 10], [12, 13, 14],
  [1, 2, 3], [5, 6, 7], [9, 10, 11], [13, 14, 15],
  [0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11], [7, 11, 15],
  [4, 8, 12], [5, 9, 13], [6, 10, 14],
  [0, 5, 10], [1, 6, 11], [4, 9, 14], [5, 10, 15],
  [8, 5, 2], [9, 6, 3], [12, 9, 6], [13, 10, 7], [6, 9, 12] 
];
const freeBoxes = [];
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}
