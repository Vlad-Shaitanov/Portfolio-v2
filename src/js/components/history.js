"use strict";

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

export default accordion;