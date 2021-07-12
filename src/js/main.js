/**
  * название функции
  *
  * //@param {number} first - первое число
  * //@returns {number}
  */

import { headAnimation, headText, headerSticky, burger } from "./components/headAnim.js";
import { workCards, createCards, cardsAnimation } from "./components/works.js";
import { accordion, historyTextTransform, historyTextAnimation } from "./components/history.js";
import contactsBlock from "./components/contacts.js";

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
			cardsAnimation();
		});
};

//Перемещение по пунктам меню
const scrolling = () => {
	const navLinks = document.querySelectorAll(".header_link");

	navLinks.forEach(link => {

		link.addEventListener("click", () => {
			const coords = link.getAttribute('data-to');

			gsap.to(window, { duration: 2, scrollTo: { y: `#${coords}`, offsetY: 70 } });
		});
	});
};
scrolling();

const titlesAnimation = () => {

	const divs = document.querySelectorAll(".title-anim-item div");
	divs.forEach(div => {
		div.addEventListener("mouseenter", () => {

			gsap.to(div, { duration: 0.5, y: -20, scaleX: 1.5, color: "red" });
		});

		div.addEventListener("mouseleave", () => {

			gsap.to(div, { duration: 0.5, y: 0, scaleX: 1, ease: "bounce", color: "#fff" });
		});
	});
};

startPreloader();

window.addEventListener("DOMContentLoaded", () => {
	// startPreloader();
	headAnimation();
	headText();
	headerSticky();
	renderCards();
	burger();
	titlesAnimation();
	accordion("accordion-head--active", "accordion-content--active", 40);
	historyTextTransform();
	//workCards();
	contactsBlock();

	window.addEventListener("scroll", () => {
		cardsAnimation();
		historyTextAnimation();
	});
});

