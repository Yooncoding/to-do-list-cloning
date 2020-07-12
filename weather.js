const weatherContainer = document.querySelector(".weather");
const API_KEY = "c087c7317d0837d86e0b463f178e012f";
const COORDS = "coords";

// 8. fetch(``); 안에는 데이터가 들어가면되 https:와 백틱사용, 뒤에 &appid=
// 9. fetch다음에 .then(함수)를 쓰면 fetch가 끝나고 then을 실행하게 한다.
// 10. network.json을 사용하면 네트워크안에 정보를 오브젝트로 가져온다.
// * 12번줄~14번줄까지 API를 실제로 이용하기 위해 변환하는 과정
function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const city = json.name;
      weatherContainer.innerText = `${temperature.toFixed(1)}°C @ ${city}`;
    })
}

// 7. loacalStorage에 object를 string으로 변환하여 저장
function saveCoords(coords_object) {
  localStorage.setItem(COORDS, JSON.stringify(coords_object));
}

// 4. navigator객체가 성공했을 때 변수.coords로 좌표 얻기 (coords=좌표, latitude=위도, longitude=경도)
// 5. 주어진 coords를 localStorage에 저장하기 위해 saveCoords함수 사용
// 6. 주어진 coords로 getWheather함수 실행
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coords_object = {
    latitude,
    longitude
  };
  saveCoords(coords_object);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("위치를 찾지 못했습니다.");
}

// 3. navigator.geolocation.getCurrentPosition(성공했을때함수,실패했을때함수, 옵션(공백가능))
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

// 1. localStorage에서 COORDS값이 없다면 askForCoords함수로 물어보기
// 2. 있다면 getWeather로 구해진 COORDS를 data형식으로 변환하고 좌표입력 후 날씨 정보 얻기
function loadCoord() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    const parse_coords = JSON.parse(loadCoords);
    getWeather(parse_coords.latitude, parse_coords.longitude);
  }
}

function init() {
  loadCoord();
}

init();