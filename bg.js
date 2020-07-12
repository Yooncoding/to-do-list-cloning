const background = document.querySelector(".background");

const IMG_NUMBER = 2;

// 1. new Image(); 변수에 이미지를 넣겠다 선언
// 2. 그 이미지의 사진은 .src로 결정
// 3. appendchild로 이미지 삽입
function printImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber+1}.jpg`;
  background.appendChild(image);
}

// Math.floor(소수) -> 정수만 남기고 소수버림
// Math.random()*3 -> 3이하에서 아무숫자 랜덤
function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  printImage(randomNumber);
}

init();