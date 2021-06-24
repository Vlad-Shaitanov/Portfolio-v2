/**
  * название функции
  *
  * //@param {number} first - первое число
  * //@returns {number}
  */

import { headAnimation, headText, headerSticky, burger } from "./components/headAnim.js";
import workCards from "./components/works.js";

window.addEventListener("DOMContentLoaded", () => {
	headAnimation();
	headText();
	headerSticky();
	burger();
	workCards();
});

