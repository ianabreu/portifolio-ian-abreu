function displayText(idActive, idInactive) {
  let active = document.getElementById(idActive);
  let inactive = document.getElementById(idInactive);
  let arrayH6 = document.querySelectorAll(".btn-h6");

  active.style.display = "block";
  inactive.style.display = "none";

  if (idActive === "biography") {
    arrayH6[0].classList.add("active");
    arrayH6[1].classList.remove("active");
  }
  if (idActive === "carreira") {
    arrayH6[1].classList.add("active");
    arrayH6[0].classList.remove("active");
  }
}

(function () {
  let menuColor = document.getElementById("menuColor");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) menuColor.classList.add("menuFixed");
    else menuColor.classList.remove("menuFixed");
  });
})();

const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
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

let target = document.querySelectorAll("[data-anime]");
const animationClass = "animate";

function animeScroll() {
  const windowTop = window.scrollY + window.innerHeight * 0.95;
  target.forEach(function (item) {
    if (windowTop > item.offsetTop) {
      item.classList.add(animationClass);
    } else {
      item.classList.remove(animationClass);
    }
  });
}
animeScroll();

if (target.length) {
  window.addEventListener(
    "scroll",
    debounce(function () {
      animeScroll();
    }, 50)
  );
}

const areaProjects = document.querySelector("#content-projects");

function renderProject() {
  projects.forEach((item) => {
    let link = document.createElement("a");
    // link.classList.add('area-img');
    link.dataset.anime = "top";
    link.id = `project_${item.id}`;
    link.onclick = function () {
      displayModal(item);
    };
    let div = document.createElement("div");
    div.classList.add("area-img");

    let img = document.createElement("img");
    img.src = `${item.url}`;
    img.alt = `${item.name}: ${item.description}`;

    div.appendChild(img);
    link.appendChild(div);
    areaProjects.appendChild(link);
  });
  target = document.querySelectorAll("[data-anime]");
}

renderProject();

function unloadScrollBars() {
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no"; // IE
}
function reloadScrollBars() {
  document.documentElement.style.overflow = "auto";
  document.body.scroll = "yes"; // IE
}

const modal = document.getElementById("modal");

function closeModal() {
  modal.style.display = "none";
  reloadScrollBars();
}

function displayModal(project) {
  modal.style.display = "flex";
  unloadScrollBars();
  createItemModal(project);
  showSlides(slideIndex);
}

function createItemModal(project) {
  let title = document.getElementById("title");
  title.innerText = project.name;

  let description = document.getElementById("description");
  description.innerText = project.description;

  project.images.forEach((url) => {
    createImagesSlider(url);
  });
  let linkButton = document.getElementById("linkButton");
  let githubButton = document.getElementById("githubButton");
  linkButton.href = project.github;
  githubButton.href = project.github;
}

function createImagesSlider(url) {
  const slidesContainer = document.getElementById("slides-container");
  let div = document.createElement("div");
  div.classList = "mySlides";
  div.style = "width:100%";

  let img = document.createElement("img");
  img.src = url;
  img.style =
    "width:100%; display:flex; align-items: center; object-fit: cover";

  div.appendChild(img);
  slidesContainer.appendChild(div);
}

let slideIndex = 1;
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active-dot";
}

const footerElement = document.getElementById("footer");
const currentYear = new Date().getFullYear();
footerElement.textContent = `${currentYear} Copyright Ian Abreu`;
