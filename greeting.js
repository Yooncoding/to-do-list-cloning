// function안에 변수를 저장할 시 그 function안에서만 사용이 가능하다.
// printGreeting -> loadName -> askForName -> handlingEvent -> saveName
const form = document.querySelector(".name");
const input = form.querySelector("input");
const greeting = document.querySelector(".greet");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// 1. submit의 이벤트의 기본설정 막기
// 2. input.value 새로운 변수에 받기
// 3. localStorage에 input.value값 저장시키기
function handlingEvent(event) {
  // event의 기본설정 막기 = submit의 기본값은 보내고나서 새로고침되는 것 
  event.preventDefault();
  //currentValue변수안에 input값 지정
  const currentValue = input.value;
  printGreeting(currentValue);
  saveName(currentValue);
}

// 1. form 보이게 하기
// 2. addEventListener로 submit할때 handlingEvent함수 발동
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handlingEvent);
}

// 1. 인삿말을 print 해야하므로 form태그 안보이게하기
// 2. 인삿말 보이게 하기위해서 h4태그 보이게하기
// 3. innerText로 인삿말 출력
function printGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요. ${text}님 반갑습니다.`
}

// 1. currentUser에 localStorage에서 값 받아오기
// 2. localStorage에 값이 없다면 askForName발동해서 물어보기
// 3. localStorage에 값이 있다면 바로 printGreeting으로 인삿말 출력
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    printGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();