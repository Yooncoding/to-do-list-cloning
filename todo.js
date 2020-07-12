const todo_form = document.querySelector(".toDoForm");
const todo_input = todo_form.querySelector("input");
const todolist = document.querySelector(".toDoList");

const TODO_LS = "todo"
// 5. 할일 목록은 배열로 만들기
let todos = [];

// 11. event.target.parentNode로 지정하고 그 변수를 removeChild로 제거한다
// 12. array.filter(function(변수)) 형식으로 쓰이고 배열 모두에 함수를 실행하고 return값만 남긴다.
function delete_todo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todolist.removeChild(li);
  const clean_todo = todos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  todos = clean_todo;
  saveTodo();
}

// 2. submit이 되면 submit의 기본설정 막고 submit된 input값을 print시킴
function handlingEvent(event) {
  event.preventDefault();
  const currentValue = todo_input.value;
  printList(currentValue);
  todo_input.value = "";
}

// 7. localStorage에서 TODO_LS에 todos배열을 저장, 이때 localStorage에는 data를 저장할수없다.
// 그래서 JSON.stringify로 Object를 String으로 변경해줘서 저장한다.
function saveTodo() {
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

// 3. HTML에서 li, btn, span를 createElement로 만들고 appendChild로 li안에 btn, span넣기
// 4. todoList ul클래스안에 li넣기
// 6. li의 id를 줘서 순서를 만들고 object를 만들고 todos배열안에 object넣기
function printList(text) {
  const li = document.createElement("li");
  const delete_btn = document.createElement("button");
  const span = document.createElement("span");
  const new_id = todos.length + 1;

  span.innerHTML = `<i class="fas fa-caret-right"></i> ` + text;
  delete_btn.innerText = "X"
  delete_btn.addEventListener("click", delete_todo)
  li.appendChild(span);
  li.appendChild(delete_btn);
  todolist.appendChild(li);
  li.id = new_id;
  const todo_object = {
    text: text,
    id: new_id
  };
  todos.push(todo_object);
  saveTodo();
}

// 10. parse_todo의 배열의 각 항목의 text를 printList함수 출력
function each_print(each_todo) {
  printList(each_todo.text);
}

// 1. localStorage.getItem으로 localStorage에 입력값 저장
// 8. localStorage에서 꺼내서 출력하기위해 JSON.parse로 다시 data값으로 바꾼다
// 9. array.forEach(function(변수))형식으로 쓰이는데 배열의 각각의 항목에 함수를 한번씩 실행
function loadTodo() {
  const todo = localStorage.getItem(TODO_LS);
  if (todo !== null) {
    const parse_todo = JSON.parse(todo);
    parse_todo.forEach(each_print);
  }
}


function init() {
  todo_form.addEventListener("submit", handlingEvent);
  loadTodo();
}

init();