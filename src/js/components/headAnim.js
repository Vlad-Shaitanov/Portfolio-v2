"use strict";

const headAnimation = () => {
	(function () {
		const canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");
		const canvasBlock = document.querySelector(".home-canvas");


		//Ширина канваса равна ширине текущего окна просмотра
		// let w = canvas.width = innerWidth;
		let w = canvas.width = canvasBlock.offsetWidth;
		//Высота канваса равна высоте текущего окна просмотра
		let h = canvas.height = innerHeight;

		//Настройки частиц
		let particles = [];

		//Настройки визуализации
		let properties = {
			bgColor: "rgba(17, 17, 19, 1)",//Фон
			particleColor: "rgba(255, 40, 40, 1)",//Цвет частицы
			particleRadius: 3,//Радиус окружности частицы
			particleCount: 60,//Количество частиц на канвасе
			particleMaxVelocity: 0.5,//Скорость частиц
			lineLength: 150,//Максимальная длина соединения между частицами
			particleLife: 6,//Жизненный цикл частицы(секунд)
		};

		//Добавляем канвас на страницу
		// document.querySelector("body").appendChild(canvas);
		canvasBlock.appendChild(canvas);


		//Масштабирование канваса при изменении размеров экрана
		window.onresize = function () {

			// w = canvas.width = innerWidth;
			// h = canvas.height = innerHeight;

			w = canvas.width = canvasBlock.offsetWidth;
			h = canvas.height = innerHeight;
		};

		class Particle {
			constructor() {
				//Расположение частицы на осях канваса
				this.x = Math.random() * w;
				this.y = Math.random() * h;

				//Скорость частиц по оси Х
				this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
				//Скорость частиц по оси У
				this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;

				this.life = Math.random() * properties.particleLife * 60;

			}

			//Положение частиц в текущий момент
			position() {
				/*Если текущее положение по Х плюс скорость Х больше ширины и скорость по Х больше нуля.
				Или текущее положение по Х плюс скорость Х меньше нуля и скорость Х меньше нуля, то
				умножаем скорость на -1(частица начнет двигаться в обратном направлении), иначе
				оставляем все как есть*/
				this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
				//Аналогично проверяем ось У
				this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;

				this.x += this.velocityX;
				this.y += this.velocityY;
			}

			//Отрисовка частиц на канвасе
			reDraw() {
				ctx.beginPath();//Начало

				//Значения по Х и У, радиус, окружность от нуля до полного круга
				ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
				ctx.closePath();//Конец
				ctx.fillStyle = properties.particleColor;//Цвет
				ctx.fill();//Заливка
			}

			//Жизненный цикл частиц
			reCalculateLife() {
				if (this.life < 1) {
					//Пересчитываем положение


					this.x = Math.random() * w;
					this.y = Math.random() * h;

					this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;

					this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;

					this.life = Math.random() * properties.particleLife * 60;
				}
				this.life--;
			}
		}

		//Обновление фона
		function reDrawBackground() {
			ctx.fillStyle = properties.bgColor;
			ctx.fillRect(0, 0, w, h);
		}

		//Линии между частицами
		function drawLines() {
			let x1, y1, x2, y2, length, opacity;

			//Проверяем расстояние между частицами(проход по массиву с частицами)
			for (let i in particles) {
				for (let k in particles) {
					//Присваиваем переменным координаты частиц
					//Первая частица
					x1 = particles[i].x;
					y1 = particles[i].y;

					//Вторая частица
					x2 = particles[k].x;
					y2 = particles[k].y;

					/*Расстояние рассчитывается по формуле диагонали:
					квадратный корень из суммы квадратов*/
					length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

					if (length < properties.lineLength) {
						//Соединяем частицы линией
						opacity = 1 - length / properties.lineLength;
						ctx.lineWidth = "0.5";
						ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.closePath();
						ctx.stroke();//Отрисовка на канвасе
					}

				}
			}

		}

		function reDrawParticles() {
			//Проход по частицам в массиве
			for (let i in particles) {
				particles[i].reCalculateLife();
				particles[i].position();
				particles[i].reDraw();
			}
		}

		function loop() {
			//Рекурсивная функция
			reDrawBackground();//Перерисовка фона
			reDrawParticles();//Перерисовка частиц
			drawLines();
			requestAnimationFrame(loop);
		}

		function init() {
			//Заполняем массив частиц
			for (let i = 0; i < properties.particleCount; i++) {
				particles.push(new Particle());
			}
			loop();
		}

		init();

	}());
};

/*===== Анимация текста на главной секции =====*/
const headText = () => {
	// let tl = gsap.timeline({ repeatDelay: 1 });
	// tl.to(".one", { duration: 0.2, x: 100, y: -10, opacity: 1 });
	// tl.to(".two", { duration: 0.2, x: 120, y: -10, opacity: 1 });
	// tl.to(".three", { duration: 0.2, x: 140, y: -10, opacity: 1 });

	// const home = document.querySelector(".home");
	// let tl1 = gsap.timeline({ delay: 2, repeat: -1 });
	// tl1.to(".greetings-text", { duration: 3, text: "Junior Web-Developer", delay: 3, left: "22%" });
	// tl1.to(".greetings-text", { duration: 3, text: "Vladislav Shaitanov", delay: 3, left: "25%" });

	// window.addEventListener("resize", () => {
	// 	let homeWidth = getComputedStyle(home).width;
	// 	console.log(homeWidth);
	// 	tl1.kill();

	// 	let tl2 = gsap.timeline({ delay: 2, repeat: -1 });// width <= 768
	// 	let tl3 = gsap.timeline({ delay: 2, repeat: -1 });// Width > 768
	// 	if (homeWidth.replace(/\D/g, "") <= 768) {
	// 		console.log("Well done");
	// 		tl3.clear();
	// 		tl2.clear();
	// 		tl2.to(".greetings-text", { duration: 3, text: "Junior Web-Developer", delay: 3, left: "0%" });
	// 		tl2.to(".greetings-text", { duration: 3, text: "Vladislav Shaitanov", delay: 3, left: "3%" });
	// 	} else if (homeWidth.replace(/\D/g, "") > 768) {
	// 		console.log("not yet");
	// 		tl2.clear();
	// 		tl3.clear();

	// 		tl3.to(".greetings-text", { duration: 3, text: "Junior Web-Developer", delay: 3, left: "22%" });
	// 		tl3.to(".greetings-text", { duration: 3, text: "Vladislav Shaitanov", delay: 3, left: "25%" });
	// 	}
	// });

	const home = document.querySelector(".home");
	let homeWidth = getComputedStyle(home).width;

	const toggleAnim = (clear = 0) => {
		let tl1 = gsap.timeline({ delay: 2, repeat: -1 });
		let tl3 = gsap.timeline({ delay: 2, repeat: -1 });
		if (homeWidth.replace(/\D/g, "") <= 768) {
			if (clear == 1) {
				tl1.kill();
				tl3.kill();
				console.log("<= 768");

			}
			tl1.to(".greetings-text", { duration: 3, text: "Junior Web-Developer", delay: 3 });
			tl1.to(".greetings-text", { duration: 3, text: "Vladislav Shaitanov", delay: 3 });
		}
		if (homeWidth.replace(/\D/g, "") >= 769) {
			if (clear == 1) {
				tl1.kill();
				tl3.kill();
				console.log("> 768");
			}
			tl3.to(".greetings-text", { duration: 3, text: "Junior Web-Developer", delay: 3, left: "22%" });
			tl3.to(".greetings-text", { duration: 3, text: "Vladislav Shaitanov", delay: 3, left: "25%" });
		}
	};

	toggleAnim();

	window.addEventListener("resize", () => {
		toggleAnim(1);
	});

};

const headerSticky = () => {
	const header = document.querySelector('.header');

	const toggleHeaderView = function () {
		let isShown = window.pageYOffset > window.innerHeight / 2;
		header.classList.toggle('isShown', isShown);
	};

	toggleHeaderView();
	window.addEventListener('scroll', toggleHeaderView);
};

/*===== Бургер-меню =====*/
const burger = () => {

	const headerBurger = document.querySelector(".header__burger");
	const headerMenu = document.querySelector(".header_menu");
	const headerLinks = document.querySelector(".header_list");

	const toggleClass = () => {
		headerBurger.classList.toggle("active");
		headerMenu.classList.toggle("active");
		document.body.classList.toggle("lock");
	};

	headerBurger.addEventListener("click", () => {
		toggleClass();
	});

	headerLinks.addEventListener("click", event => {
		const target = event.target;
		//console.log(target);

		if (target.classList.contains("header_link")) {
			toggleClass();
		}
	});
};

export { headAnimation, headText, headerSticky, burger };

