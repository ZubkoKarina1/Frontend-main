import '../css/main.css';
import logo from '../img/logo.png';

console.log("Hello JS!");

// Додаємо логотип у сторінку
const img = document.createElement('img');
img.src = logo;
img.alt = 'Логотип';
document.body.appendChild(img);