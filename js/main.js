
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
	}, 50));
}


const areaProjects = document.querySelector('#content-projects')


function renderProject() {
	projects.forEach((item) => {
		let link = document.createElement('a');
		link.classList.add('area-img');
		link.id = `project_${item.id}`;
		link.onclick = function() {
			displayModal(item);
		}

		let img = document.createElement('img');
		img.src = `${item.url}`;
		img.alt = `${item.name}: ${item.description}`

		
		link.appendChild(img);
		areaProjects.appendChild(link);
	});
}
renderProject();

const modal = document.getElementById('modal');

function closeModal() {
	modal.style.display = 'none';
}

function displayModal(project) {
modal.style.display = 'flex';
montaItemModal(project)
showSlides(slideIndex);
}

function montaItemModal(project) {
	let title = document.getElementById('title');
	let description = document.getElementById('description');
	title.innerText = project.name;
	description.innerText = project.description;
	project.images.forEach((url) => {
		montaImageSlider(url);
	})
}

function montaImageSlider(url) {
	const slidesContainer = document.getElementById('slides-container');
	let div = document.createElement('div');
	let img = document.createElement('img');
	div.classList = 'mySlides fade image';
	img.src = url;
	img.style = 'width:100%';
	div.appendChild(img);
	slidesContainer.appendChild(div);
}


	let slideIndex = 1;
	
	
	function plusSlides(n) {
		showSlides(slideIndex += n);
	}
	
	function currentSlide(n) {
		showSlides(slideIndex = n);
	}
	
	function showSlides(n) {
		let i;
		let slides = document.getElementsByClassName("mySlides");
		let dots = document.getElementsByClassName("dot");
		if (n > slides.length) {slideIndex = 1}
		if (n < 1) {slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[slideIndex-1].style.display = "block";
		dots[slideIndex-1].className += " active";
	}