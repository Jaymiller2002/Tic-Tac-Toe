const box = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');
let x = "<img src='images/x.png'>";
let o = "<img src='images/o.png'>";

const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6]
]