/**
  * название функции
  *
  * //@param {number} first - первое число
  * //@returns {number}
  */

import { headAnimation, headText, headerSticky, burger } from "./components/headAnim.js";
import workCards from "./components/works.js";

const startPreloader = () => {
	//Обработка стартовой анимации
	const preloader = document.querySelector(".preloader");

	preloader.classList.add("preloader-animation");

	setTimeout(() => {
		preloader.classList.remove("preloader-animation");

		//Скрываем прелодер
		preloader.classList.add("preloader-hidden");
	}, 3000);

	setTimeout(() => {
		//Убираем прелодер со страницы
		preloader.classList.add("preloader-none");
	}, 3200);
};

window.addEventListener("DOMContentLoaded", () => {
	startPreloader();
	headAnimation();
	headText();
	headerSticky();
	burger();
	workCards();
});

