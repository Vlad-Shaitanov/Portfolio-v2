"use strict";

const createCards = (works) => {
	const { id, img, title, description, revInfo, sourceLink, siteLink } = works;
	const cardsWrap = document.querySelector(".card-wrap");//Обертка
	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("data-rev", `${id}`);

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
						<a href="${siteLink}" target="_blank"><img src="../img/site.png" alt="website" title="Перейти на сайт"></a>
					</div>
				</div>
			</div>
		</div>
	`);
	cardsWrap.appendChild(card);

};

const workCards = () => {

	const cards = document.querySelectorAll(".card");
	const cardCloseBtns = document.querySelectorAll(".card-reveal .close");
	//console.log(cards);
	cards.forEach((card, i) => {
		card.addEventListener("click", event => {
			const target = event.target;
			if (target.classList.contains("card-more-descr")) {
				card.querySelector(".card-reveal").classList.remove("card-reveal-close");
				card.querySelector(".card-reveal").classList.add("card-reveal-open");
			}
		});
	});

	cardCloseBtns.forEach((btn, i) => {
		btn.addEventListener("click", (event) => {
			const target = event.target;
			//console.log(target);
			if (target.closest(".card-reveal")) {
				if (cards[i].getAttribute(`data-rev`) == `${i}`) {
					target.closest(".card-reveal").classList.remove("card-reveal-open");
					target.closest(".card-reveal").classList.add("card-reveal-close");
				}
			}
		});
	});

};


export { workCards, createCards };
