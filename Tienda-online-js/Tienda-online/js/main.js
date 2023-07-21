let products =[];

fetch("./js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    });

const containerProducts = document.querySelector("#container-products");
const buttonsCategories = document.querySelectorAll(".btn-cat");
const titlePrincipal = document.querySelector("#title-principal");
let btnAdd = document.querySelectorAll(".product-add");
const numberProduct = document.querySelector("#number");

function loadProducts(productsSelected) {

    containerProducts.innerHTML = "";

    productsSelected.forEach(product =>{
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML=`
        <img class="product-image" src="${product.image}" alt="${product.title}">
        <div class="product-details">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="product-add" id="${product.id}">Agregar</button>
        </div>
        `;

        containerProducts.append(div);
    });
    updateButtonAdd();
};




buttonsCategories.forEach(btn => {
    btn.addEventListener("click", (e) => {

        buttonsCategories.forEach(btn => btn.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "all") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id);
            titlePrincipal.innerText = productCategory.category.name;

            const productsBtn = products.filter(product => product.category.id === e.currentTarget.id);
            loadProducts(productsBtn);
        } else {
            titlePrincipal.innerText = "Todos los productos"
            loadProducts(products);
        }
    });

});

function updateButtonAdd() {
    btnAdd = document.querySelectorAll(".product-add");

    btnAdd.forEach(btn => {
        btn.addEventListener ("click", addToCar);
    });
}

let productsInCar;

let productsInCarLS = localStorage.getItem("products-in-car");


if (productsInCarLS) {
    productsInCar = JSON.parse(productsInCarLS);
    updateNumber();
} else {
    productsInCar = [];
}

function addToCar (e){

    Toastify({
        text: "Producto Agregado al Carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #785ce9, #4b33a8)",
          borderRadius: "2rem",

        },
        offset: {
            x: '2rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '2rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();      

    const idBtn = e.currentTarget.id;
    const productAdd = products.find(product => product.id === idBtn);
    
    if (productsInCar.some(product => product.id === idBtn)) {
        const index = productsInCar.findIndex(product => product.id === idBtn);
        productsInCar[index].lot++;
    } else {
        productAdd.lot = 1;
        productsInCar.push(productAdd);
    }
    
    updateNumber();

    localStorage.setItem("products-in-car", JSON.stringify(productsInCar));
}

function updateNumber () {
    let newNumber = productsInCar.reduce((acc, product) => acc + product.lot, 0);
    numberProduct.innerText = newNumber;
}
