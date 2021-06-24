"use strict";

const workCards = () => {

	const cards = document.querySelectorAll(".card");
	const cardCloseBtns = document.querySelectorAll(".card-reveal .close");
	console.log(cards);
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

export default workCards;
