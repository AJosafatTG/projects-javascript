const mountainBlue = document.querySelector("#mountain-blue");
const mountainRed = document.querySelector("#mountain-red");
const treesLeft = document.querySelector("#trees-left");
const treesBottom = document.querySelector("#trees-bottom");
const men = document.querySelector("#men");
const plants = document.querySelector("#plants");
const title = document.querySelector("#title");

window.addEventListener("scroll", () => {
   let scroll = window.scrollY;
   
   mountainBlue.style.left = scroll * 1 +"px"
   mountainRed.style.left = scroll * 0.5 + "px"
   treesLeft.style.bottom = scroll * -1 + "px"
   treesBottom.style.right = scroll * 1.5 + "px"
   men.style.right = scroll + "px"
   plants.style.bottom = scroll * -0.5 + "px"
   title.style.right = scroll * 2 + "px"
});