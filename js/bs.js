let sumaTotal = 0;
let historialPrecios = JSON.parse(localStorage.getItem("historialPrecios")) || [];

document.getElementById("precioBoton").addEventListener("click", function () {
    const nuevoPrecio = parseFloat(document.getElementById("precioInput").value);

    validarPrecio(nuevoPrecio)
        .then(() => {
            historialPrecios.push(nuevoPrecio);
            sumaTotal += nuevoPrecio;
            document.getElementById("precioTotal").textContent = sumaTotal.toFixed(2);
            return actualizarLocalStorage();
        })
        .catch(error => {
            Swal.fire({
                title: "",
                text: error.message,
                icon: "warning"
            });
        });
});

var storedPrecioTotal = localStorage.getItem("precioTotal");
var storedCorreoInput = localStorage.getItem("correoInput");

if (storedPrecioTotal !== null) {
    document.getElementById("precioTotal").textContent = storedPrecioTotal;
}

if (storedCorreoInput !== null) {
    document.getElementById("correoInput").value = storedCorreoInput;
}

document.getElementById("formularioMail").addEventListener("submit", function (event) {
    event.preventDefault();
    const correoInput = document.getElementById("correoInput").value;

    validarCorreo(correoInput)
        .then(() => {
            localStorage.setItem("correoInput", correoInput);
            Swal.fire({
                title: "GENIAL",
                text: "Nos pondremos en contacto contigo",
                icon: "success"
            });
        })
        .catch(error => {
            Swal.fire({
                title: "",
                text: error.message,
                icon: "error"
            });
        });
});


document.getElementById("resetearBoton").addEventListener("click", function () {
    resetearValores()
        .then(() => {
            console.log("Código en el bloque finally");
        })
        .catch(error => {
            Swal.fire({
                title: "",
                text: error.message,
                icon: "error"
            });
        });
});


function validarPrecio(precio) {
    return new Promise((resolve, reject) => {
        if (!isNaN(precio)) {
            resolve();
        } else {
            reject(new Error("Por favor, ingrese un número válido"));
        }
    });
}


function validarCorreo(correo) {
    return new Promise((resolve, reject) => {
        if (correo.trim() !== "") {
            resolve();
        } else {
            reject(new Error("Por favor, ingrese un correo"));
        }
    });
}


function actualizarLocalStorage() {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem("historialPrecios", JSON.stringify(historialPrecios));
            localStorage.setItem("precioTotal", sumaTotal.toFixed(2));
            resolve();
        } catch (error) {
            reject(new Error(error.message));
        }
    });
}


function resetearValores() {
    return new Promise((resolve, reject) => {
        try {
            sumaTotal = 0;
            historialPrecios = [];
            document.getElementById("precioTotal").textContent = sumaTotal.toFixed(2);
            actualizarLocalStorage().then(resolve).catch(reject);
        } catch (error) {
            reject(new Error(error.message));
        }
    });
}