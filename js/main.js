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
  const windowTop = window.scrollY + window.innerHeight * 0.98;
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
    link.dataset.anime = "top";
    link.id = `project_${item.id}`;
    link.onclick = function () {
      displayModal(item);
    };
    let div = document.createElement("div");
    div.classList.add("area-img");

    let img = document.createElement("img");
    img.src = `${item.url}`;
    img.alt = `${item.name}`;

    let title = document.createElement("h2");
    title.innerText = `${item.name}`;
    title.classList.add("title-project");

    div.appendChild(title);
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
  linkButton.style.display = "flex";
  deleteItemModal();
  reloadScrollBars();
}

function displayModal(project) {
  unloadScrollBars();
  createItemModal(project);
  eventDrag();
  modal.style.display = "flex";
}
const slider = document.getElementById("slider");
const slides = document.getElementById("slides");
const linkButton = document.getElementById("linkButton");

function deleteItemModal() {
  const inputElements = slider.querySelectorAll("input");
  if (inputElements.length > 0)
    inputElements.forEach((inputElement) => {
      inputElement.remove();
    });
  while (slides.firstChild) {
    slides.removeChild(slides.firstChild);
  }
  let divNavigationAuto = document.getElementById("navigation-auto");
  while (divNavigationAuto.firstChild) {
    divNavigationAuto.removeChild(divNavigationAuto.firstChild);
  }
  let divManualNavigation = document.getElementById("manual-navigation");
  while (divManualNavigation.firstChild) {
    divManualNavigation.removeChild(divManualNavigation.firstChild);
  }
}

function createItemModal(project) {
  let title = document.getElementById("title");
  title.innerText = project.name;

  let description = document.getElementById("description");
  description.innerText = project.description;

  createSlider(project.images);

  let githubButton = document.getElementById("githubButton");
  linkButton.href = project.demo;
  if (project.category === "App") {
    linkButton.style.display = "none";
  }
  githubButton.href = project.github;
}

function createSlider(urlImages) {
  urlImages.forEach((url, index) => {
    createInputRadio(index);
  });
  urlImages.forEach((url, index) => {
    createImageDraggable(url, index);
  });
  urlImages.forEach((url, index) => {
    createNavigation(url, index);
  });
}
function createInputRadio(index) {
  let inputRadio = document.createElement("input");
  inputRadio.type = "radio";
  inputRadio.name = `radio-btn`;
  inputRadio.id = `radio${index}`;
  if (inputRadio.id === "radio0") {
    inputRadio.setAttribute("checked", true);
  }
  slider.insertBefore(inputRadio, slides);
}
function createImageDraggable(url, index) {
  let divSlide = document.createElement("div");
  divSlide.className = "slide";
  if (index === 0) divSlide.classList.add("first");

  let imgDraggable = document.createElement("img");
  imgDraggable.className = "draggable";
  imgDraggable.src = url;

  divSlide.appendChild(imgDraggable);
  slides.appendChild(divSlide);
}

function createNavigation(url, index) {
  let divNavigationAuto = document.getElementById("navigation-auto");
  let autoBtn = document.createElement("div");
  autoBtn.className = `auto-btn${index}`;
  divNavigationAuto.appendChild(autoBtn);

  let divManualNavigation = document.getElementById("manual-navigation");
  let manualBtn = document.createElement("label");
  manualBtn.className = "manual-btn";
  manualBtn.htmlFor = `radio${index}`;
  divManualNavigation.appendChild(manualBtn);
}

//--------------- Arrastar Slides -------------------------

let count = 0;
function nextImage(direction, arrayImages) {
  let limit = arrayImages - 1;
  if (direction === "left") {
    count++;
    if (count > limit) count = 0;
  }
  if (direction === "right") {
    count--;
    if (count < 0) count = limit;
  }
  document.getElementById(`radio${count}`).checked = true;
}

const draggable = document.getElementsByClassName("draggable");
let initialX;
let direction;

function eventDrag() {
  for (let index = 0; index < draggable.length; index++) {
    draggable[index].addEventListener("mousedown", startDragging);
    draggable[index].addEventListener("touchstart", startDragging);

    draggable[index].addEventListener("mousemove", drag);
    draggable[index].addEventListener("touchmove", drag);

    draggable[index].addEventListener("mouseup", (event) => {
      stopDragging(event, draggable.length);
    });
    draggable[index].addEventListener("touchend", (event) => {
      stopDragging(event, draggable.length);
    });
  }
}

function startDragging(event) {
  if (event.type === "mousedown") {
    initialX = event.clientX;
  } else if (event.type === "touchstart") {
    initialX = event.touches[0].clientX;
  }
}

function drag(event) {
  event.preventDefault();

  if (initialX === undefined) return;

  let currentX;

  if (event.type === "mousemove") {
    currentX = event.clientX;
  } else if (event.type === "touchmove") {
    currentX = event.touches[0].clientX;
  }

  let deltaX = currentX - initialX;
  direction = deltaX > 0 ? "right" : "left";
}

function stopDragging(event, arrayLength) {
  nextImage(direction, arrayLength);
  initialX = undefined;
}

//-------------------------Footer date ----------------------------------------
const footerElement = document.getElementById("footer");
const currentYear = new Date().getFullYear();
footerElement.textContent = `${currentYear} Copyright Ian Abreu`;
