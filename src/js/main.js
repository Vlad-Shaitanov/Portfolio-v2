/**
  * название функции
  *
  * //@param {number} first - первое число
  * //@returns {number}
  */

import { headAnimation, headText, headerSticky, burger } from "./components/headAnim.js";
import { workCards, createCards } from "./components/works.js";

const startPreloader = () => {
	//Обработка стартовой анимации
	const preloader = document.querySelector(".preloader");

	preloader.classList.add("preloader-animation");
	//Убираем скролл
	document.body.style.overflow = "hidden";

	setTimeout(() => {
		preloader.classList.remove("preloader-animation");

		//Скрываем прелодер
		preloader.classList.add("preloader-hidden");
	}, 3000);

	setTimeout(() => {
		//Убираем прелодер со страницы
		preloader.classList.add("preloader-none");

		//Возвращаем скролл
		document.body.style.overflow = "";
	}, 3200);
};

const getData = async function (url) {//Работа с базой данных
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url},
		статус ошибки ${response.status}!`);
	}
	return await response.json();
};
//console.log(getData("./database/db.json"));

const renderCards = () => {
	getData("./database/db.json")
		.then(works => {
			works.forEach(createCards);
			workCards();
		});
};



window.addEventListener("DOMContentLoaded", () => {
	startPreloader();
	headAnimation();
	headText();
	headerSticky();
	burger();
	renderCards();
	//workCards();
});

