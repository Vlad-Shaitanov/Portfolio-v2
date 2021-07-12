"use strict";

const contactsBlock = () => {

	const segments = document.querySelector(".segments");
	const mainSegment = document.querySelector(".main-segment");
	const childSegments = segments.querySelectorAll(".child-segment");
	const telSegment = document.querySelector(".tel-segment");
	const mailSegment = document.querySelector(".mail-segment");
	const telegramSegment = document.querySelector(".telegram-segment");
	const githubSegment = document.querySelector(".github-segment");
	let contactsDescr = document.querySelector(".contacts-descr a");


	mainSegment.addEventListener("click", () => {
		mainSegment.classList.toggle("segment-animation");
		mainSegment.style.boxShadow = "none";

		childSegments.forEach(elem => {

			elem.classList.toggle("segment-animation");
			elem.style.boxShadow = "none";
		});

		if (!mainSegment.classList.contains("segment-animation")) {

			gsap.to(telSegment, { duration: 0.5, y: "-110%", opacity: 1 });
			gsap.to(telegramSegment, { delay: 0.2, duration: 0.5, x: "110%", opacity: 1 });
			gsap.to(githubSegment, { delay: 0.4, duration: 0.5, y: "110%", opacity: 1 });
			gsap.to(mailSegment, { delay: 0.6, duration: 0.5, x: "-110%", opacity: 1 });
			gsap.to(mainSegment, { delay: 0.8, opacity: 0.5 });

		} else {
			gsap.to(mainSegment, { delay: 0.1, opacity: 1 });
			gsap.to(telSegment, { delay: 0.6, duration: 0.5, y: 0, opacity: 0 });
			gsap.to(telegramSegment, { delay: 0.4, duration: 0.5, x: 0, opacity: 0 });
			gsap.to(githubSegment, { delay: 0.2, duration: 0.5, y: 0, opacity: 0 });
			gsap.to(mailSegment, { duration: 0.5, x: 0, opacity: 0 });

			contactsDescr.innerHTML = "";
		}
	});


	childSegments.forEach(elem => {

		elem.addEventListener("click", () => {
			const attr = elem.querySelector("a").getAttribute('href');

			contactsDescr.setAttribute("href", `${attr}`);
			contactsDescr.innerHTML = elem.querySelector("a").innerHTML;
		});
	});
};

export default contactsBlock;