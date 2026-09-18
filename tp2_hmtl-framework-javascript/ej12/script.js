function actualizarReloj() {
    const fechaYhora = new Date();
    document.getElementById("reloj").textContent = fechaYhora.toLocaleString();
}

actualizarReloj();

setInterval(actualizarReloj, 1000);