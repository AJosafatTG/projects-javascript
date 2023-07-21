const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector(".aside-menu");
const btnCategories = document.querySelectorAll(".btn-cat");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible")
});

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible")
});

btnCategories.forEach(btn => btn.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

