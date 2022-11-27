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