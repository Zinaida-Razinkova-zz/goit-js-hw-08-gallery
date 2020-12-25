import gallery from "./gallery-items.js";

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>; */

// ЧАСТЬ 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryRef = (gallery) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  const a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", gallery.original);

  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.setAttribute("src", gallery.preview);
  img.setAttribute("data-source", gallery.original);
  img.setAttribute("alt", gallery.description);
  li.append(img);

  return li;
};

const newArrayImg = gallery.map(({ preview, original, description }) =>
  galleryRef({ preview, original, description })
);
console.log(newArrayImg);

const listRef = document.querySelector(".gallery");
listRef.classList.add("js-gallery");
listRef.append(...newArrayImg);

// ЧАСТЬ 2. Делегирование. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
const nav = document.querySelector(".js-gallery");
nav.addEventListener("click", NavClick);

function NavClick(event) {
  const data = event.target.dataset.source;
  // При клике на картинку выводим в консоль значение data-source в img.
  console.log(data);
  // прекращаем дефолтное поведение.
  event.preventDefault();
  // Проверяем есть ли клик по превью.
  if (event.target.nodeName !== "IMG") {
    console.log("Кликнули не по превью!");
    return;
  }
  // Включаются функции открытия модального окна и подмены значения атрибута src элемента img.lightbox__image.
  newSrc(event);
  openModal();
}

// ЧАСТЬ 3. Открытие модального окна.
const ModalRef = document.querySelector("div.lightbox");
listRef.addEventListener("click", openModal);
function openModal() {
  ModalRef.classList.add("is-open");
}

// ЧАСТЬ 4.Подмена значения атрибута src элемента img.lightbox__image.
const ImageRef = document.querySelector(".lightbox__image");
function newSrc(event) {
  ImageRef.src = event.target.dataset.source;
}

// ЧАСТЬ 5. Закрытие модального окна и очистка src
const closeModal = document.querySelector(
  'button[data-action="close-lightbox"]'
);
closeModal.addEventListener("click", onCloseModal);
function onCloseModal() {
  // очистка src
  ImageRef.src = "";
  // Закрытие модального окна
  ModalRef.classList.remove("is-open");
}

// ЧАСТЬ 6. Закрытие модального окна при нажатии на оверлей
const closeModalOverlay = document.querySelector("div.lightbox__overlay");
// div.lightbox__overlay
closeModalOverlay.addEventListener("click", onCloseModalOverlay);

function onCloseModalOverlay() {
  // очистка src
  ImageRef.src = "";
  // Закрытие модального окна
  ModalRef.classList.remove("is-open");
}
