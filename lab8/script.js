// === DOM елементи ===
const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const leftCount = document.getElementById('left');
const clearBtn = document.getElementById('clear-completed');
// === Стан ===
let tasks = []; // [{id, text, completed}]
let nextId = 1;
// === Рендер ===
function render() {
list.innerHTML = '';
tasks.forEach(task => {
const li = document.createElement('li');
li.className = 'task' + (task.completed ? ' completed' : '');
li.innerHTML = `
<input type="checkbox" ${task.completed ? 'checked' : ''}>
<span>${escapeHtml(task.text)}</span>
<button data-id="${task.id}">Видалити</button>
`;
// чекбокс
li.querySelector('input[type="checkbox"]').addEventListener('change'
, () => {
task.completed = !task.completed;
save();
render();
});
// кнопка видалення
li.querySelector('button').addEventListener('click', () => {
tasks = tasks.filter(t => t.id !== task.id);
save();
render();
});
list.appendChild(li);
});
const left = tasks.filter(t => !t.completed).length;
leftCount.textContent = left;
}
// === Додати задачу ===
function addTask() {
const text = input.value.trim();
if (!text) return;
tasks.push({
id: nextId++,
text,
completed: false
});
input.value = '';
save();
render();
}
// === Збереження в localStorage ===
function save() {
localStorage.setItem('todo-tasks', JSON.stringify(tasks));
localStorage.setItem('todo-nextId', nextId);
}
function load() {
const saved = localStorage.getItem('todo-tasks');
if (saved) {
tasks = JSON.parse(saved);
}
const savedId = localStorage.getItem('todo-nextId');
if (savedId) nextId = parseInt(savedId, 10);
}
// === Очистити виконані ===
clearBtn.addEventListener('click', () => {
tasks = tasks.filter(t => !t.completed);
save();
render();
});
// === Події ===
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', e => {
if (e.key === 'Enter') addTask();
});
// === Безпека: екранування HTML ===
function escapeHtml(str) {
const div = document.createElement('div');
div.textContent = str;
return div.innerHTML;
}
// === Старт ===
load();
render();