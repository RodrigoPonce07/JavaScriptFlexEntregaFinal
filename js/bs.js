let sumaTotal = 0;
let historialPrecios = JSON.parse(localStorage.getItem("historialPrecios")) || [];

document.getElementById("precioBoton").addEventListener("click", function () {
    const nuevoPrecio = parseFloat(document.getElementById("precioInput").value);

    if (!isNaN(nuevoPrecio)) {
        historialPrecios.push(nuevoPrecio);
        sumaTotal += nuevoPrecio;
        document.getElementById("precioTotal").textContent = sumaTotal.toFixed(2);
        actualizarLocalStorage();
    } else {
        Swal.fire({
            title: "",
            text: "Por favor, ingrese un número válido",
            icon: "warning"
        });
    }
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
    var correoInput = document.getElementById("correoInput").value;

    if (correoInput.trim() === "") {
        Swal.fire({
            title: "",
            text: "Por favor, ingrese un correo",
            icon: "error"
        });
    } else {
        localStorage.setItem("correoInput", correoInput);
        Swal.fire({
            title: "GENIAL",
            text: "Nos pondremos en contacto contigo",
            icon: "success"
        });
    }
});


document.getElementById("resetearBoton").addEventListener("click", function () {
    sumaTotal = 0;
    historialPrecios = [];
    document.getElementById("precioTotal").textContent = sumaTotal.toFixed(2);
    actualizarLocalStorage();
});


function actualizarLocalStorage() {
    localStorage.setItem("historialPrecios", JSON.stringify(historialPrecios));
    localStorage.setItem("precioTotal", sumaTotal.toFixed(2));
}