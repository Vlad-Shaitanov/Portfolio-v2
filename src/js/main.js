/**
  * название функции
  *
  * //@param {number} first - первое число
  * //@returns {number}
  */

import { headAnimation, headText, headerSticky, burger } from "./components/headAnim.js";

window.addEventListener("DOMContentLoaded", () => {
	headAnimation();
	headText();
	headerSticky();
	burger();
});

