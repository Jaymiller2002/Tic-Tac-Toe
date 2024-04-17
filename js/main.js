const playNowButton = document.getElementById("play-now");
const restartButton = document.getElementById("restart");
const boxes = document.querySelectorAll(".box");

let playNowCount = 0;
let restartCount = 0;

playNowButton.addEventListener("click", function() {
    playNowCount++;
    console.log("Play Now button clicked " + playNowCount + " times.");
});

restartButton.addEventListener("click", function() {
    restartCount++;
    console.log("Restart Game button clicked " + restartCount + " times.");
});

boxes.forEach(function(box, index) {
    box.addEventListener("click", function() {
    console.log("Box " + index + " clicked.");
// Add your Tic-Tac-Toe game logic here
});
});