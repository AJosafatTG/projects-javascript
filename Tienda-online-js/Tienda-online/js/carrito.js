let productsInCar = localStorage.getItem("products-in-car");
productsInCar = JSON.parse(productsInCar);
const containerCarEmpty = document.querySelector("#car-empty");
const containerProducts = document.querySelector("#container-car-products");
const containerCarActions = document.querySelector("#car-actions");
const containerCarBuyed = document.querySelector("#car-buyed");
const btnEmpty = document.querySelector("#car-actions-empty")
const containerTotal = document.querySelector("#total")
let btnDelete = document.querySelectorAll(".car-product-delete");
const btnBuyed = document.querySelector("#car-actions-buy");


function loadProductsCar() {
    if (productsInCar && productsInCar.length > 0) {
        containerCarEmpty.classList.add("disabled");
        containerProducts.classList.remove("disabled");
        containerCarActions.classList.remove("disabled");
        containerCarBuyed.classList.add("disabled");
    
        containerProducts.innerHTML = "";
    
        productsInCar.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("car-product");
            div.innerHTML =`
            <img class="car-product-image" src="${product.image}" alt="${product.title}">
             <div class="car-product-title">
                <small>Título</small>
                <h3>${product.title}</h3>
            </div>
            <div class="car-product-lot">
                <small>Cantidad</small>
                <p>${product.lot}</p>
            </div>
            <div class="car-product-price">
                <small>Precio</small>
                <p>${product.price}</p>
            </div>
            <div class="car-product-subtotal">
                <small>Subtototal</small>
                <p>${product.price * product.lot}</p>
            </div>
            <button class="car-product-delete" id= "${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            
            containerProducts.append(div);
    
        });
        
    } else {
        containerCarEmpty.classList.remove("disabled");
        containerProducts.classList.add("disabled");
        containerCarActions.classList.add("disabled");
        containerCarBuyed.classList.add("disabled");
    }
    updateButtonDelete();
    updateTotal();
}

loadProductsCar();


function updateButtonDelete() {
    btnDelete = document.querySelectorAll(".car-product-delete");

    btnDelete.forEach(btn => {
        btn.addEventListener ("click", deleteToCar);
    });
}

function deleteToCar(e) {
    //Libreria Toastify
    Toastify({
        text: "Producto Eliminado",
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
    
    const index = productsInCar.findIndex(product => product.id === idBtn);
    productsInCar.splice(index, 1);
    loadProductsCar();

    localStorage.setItem("products-in-car", JSON.stringify(productsInCar));
}

btnEmpty.addEventListener("click", emptyCar)
function emptyCar() {
  //Alerta de confirmación para borrar todos los productos del carrito
    Swal.fire({
        title: '¿Estás Seguro?',
        icon: 'error',
        html:
          'Se borrarán todos los produtos de tu carrito',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Sí',
        cancelButtonText:'No',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productsInCar.length = 0;
            localStorage.setItem("products-in-car", JSON.stringify(productsInCar));
            loadProductsCar();
            }
        });
    
}

function updateTotal() {
    const totalCalculate = productsInCar.reduce((acc, product) => acc + (product.price * product.lot),0)
    total.innerText = `$${totalCalculate}`;
}

btnBuyed.addEventListener("click", buyedCar)
function buyedCar() {
    //Alerta de confirmación para comprar los productos que añadiste al carrito
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-cancel'
        },
        buttonsStyling: false
      });
      
      swalWithBootstrapButtons.fire({
        title: '¿Estás Seguro?',
        text: "Confirmar la compra",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Si, Comprar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Comprado!',
            'Tu compra fue realizada con exito!',
            'success'
            
          );
          productsInCar.length = 0;
        localStorage.setItem("products-in-car", JSON.stringify(productsInCar));
    
        containerCarEmpty.classList.add("disabled");
        containerProducts.classList.add("disabled");
        containerCarActions.classList.add("disabled");
        containerCarBuyed.classList.remove("disabled");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelada',
            'Tu compra no fue realizada :(',
            'error'
          );
        }
      });
    
}