
function displayText(idActive, idInactive) {
	let active = document.getElementById(idActive);
	let inactive = document.getElementById(idInactive);
	let arrayH6 = document.querySelectorAll('.btn-h6');
	
	active.style.display = 'block';
	inactive.style.display = 'none';
	
	if (idActive === 'biography') {
		arrayH6[0].classList.add("active");
		arrayH6[1].classList.remove("active");
	}
	if (idActive === 'carreira') {
		arrayH6[1].classList.add("active");
		arrayH6[0].classList.remove("active");
	}
}


(function () {
	let menuColor = document.getElementById('menuColor');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 ) menuColor.classList.add('menuFixed'); 
        else menuColor.classList.remove('menuFixed');
    });
})();


const debounce = function(func, wait, immediate) {
	let timeout;
	return function(...args) {
	  const context = this;
	  const later = function () {
		timeout = null;
		if (!immediate) func.apply(context, args);
	  };
	  const callNow = immediate && !timeout;
	  clearTimeout(timeout);
	  timeout = setTimeout(later, wait);
	  if (callNow) func.apply(context, args);
	};
  };


const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
const windowTop = window.scrollY + (window.innerHeight * 0.75);
target.forEach(function(item) {
	if ((windowTop) > item.offsetTop) {
		item.classList.add(animationClass);
	} else {
		item.classList.remove(animationClass);
	}
})
}
animeScroll();

if (target.length) {
	window.addEventListener('scroll', debounce(function() {
		animeScroll();
		console.log(12);
	}, 50));
}