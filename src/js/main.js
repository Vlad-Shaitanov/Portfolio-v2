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

const getData = async function (url) {//Работа с базой данных
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url},
		статус ошибки ${response.status}!`);
	}
	return await response.json();
};

console.log(getData("./database/db.json"));


const createCards = (works) => {
	const { id, img, title, description, revInfo, sourceLink, siteLink } = works;
	const cardsWrap = document.querySelector(".card-wrap");//Обертка
	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("data-rev", `${id + 4}`);

	card.insertAdjacentHTML("beforeend", `
		<img src="${img}" alt="photo">
		<div class="card-body">
			<div class="card-title">${title}</div>
			<div class="card-info">${description}</div>
		</div>
		<div class="card-more">
			<button type="button" class="card-more-descr">Подробнее</button>
		</div>


		<div class="card-reveal">
			<div class="close">&times;</div>
			<div class="card-reveal-body">
				<div class="card-reveal-text">
					${revInfo}
				</div>
				<div class="card-reveal-links">
					<div class="source reveal-item">
						<a href="${sourceLink}" target="_blank"><img src="../img/code.png"
								alt="code" title="Посмотреть код"></a>
					</div>
					<div class="site reveal-item">
						<a href="${siteLink}"><img src="../img/site.png" alt="website" title="Перейти на сайт"></a>
					</div>
				</div>
			</div>
		</div>
	`);
	cardsWrap.appendChild(card);

};

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
	workCards();
});

