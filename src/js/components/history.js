"use strict";

let count = true;
//Массив из анимируемых блоков
const merge = [];

const accordion = (headActive, contentActive, paddings) => {
	const accordionHeads = document.querySelectorAll(".accordion-head");

	accordionHeads.forEach(item => {
		item.addEventListener("click", () => {
			// item.classList.remove(headActive);
			// item.classList.remove(contentActive);

			//По клику в заголовок переключаем активный класс
			item.classList.toggle(headActive);
			//Так же переключаем активный клас на его соседнем элементе
			item.nextElementSibling.classList.toggle(contentActive);

			//Проверяем, есть ли активный класс на текущем элементе
			if (item.classList.contains(headActive)) {
				/*Устанавливаем следующему элементу высоту, равную высоте контента
				в элементе(величина скролла) + паддинги*/
				item.nextElementSibling.style.maxHeight = item.nextElementSibling.scrollHeight + paddings + "px";
			} else {
				//Если активного класса нет, устанавливаем высоту элемента в 0
				item.nextElementSibling.style.maxHeight = "0px";
			}
		});
	});

};


const historyTextTransform = () => {
	//Блоки текста, которые нужно анимировать
	const texts = document.querySelectorAll(".text");

	//Разделяем текст на дивы
	const splitText = (elem) => {
		elem.innerHTML = elem.textContent.replace(/(\S*)/g, m => {
			return `<div class="words">` +
				m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
				`</div>`;
		});
		return elem;
	};

	texts.forEach(text => {
		merge.push(splitText(text));
	});

};

const historyTextAnimation = () => {
	const historyBlock = document.querySelector('.history');
	//Поиск рандомного числа
	function random(min, max) {
		return (Math.random() * (max - min) + min);
	}

	let windowCenter = (window.innerHeight / 2) + window.scrollY;
	let scrollOffset = historyBlock.offsetTop;
	//console.log(windowCenter, scrollOffset);

	if (windowCenter >= scrollOffset && count) {
		merge.forEach((item) => {


			Array.from(item.querySelectorAll(".letter")).forEach((elem, index) => {
				TweenMax.from(elem, 1.5, {
					opacity: 0,
					scale: 0.1,
					x: random(-100, 100),
					y: random(-100, 100),
					z: random(-100, 100),
					delay: index * 0.01,
					repeat: 0,
				});

				TweenMax.to(elem, 1.5, {
					opacity: 1,
					scale: 1,
					x: 0,
					y: 0,
					z: 0,
					delay: index * 0.01,
					repeat: 0,
				});
			});
		});
		count = false;
	}
	//console.log(count);
};

export { accordion, historyTextTransform, historyTextAnimation };
