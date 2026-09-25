let numeroRandom = Math.floor(Math.random() * 1000) + 1;
let intentos = 0;

let estadisticas = {
    partidasFinalizadas: 0,
    sumaTotalIntentos: 0,
    mejorPuntaje: null
};

function cargarEstadisticas() {
    let datosGuardados = localStorage.getItem('statsJuego');

    if (datosGuardados !== null) {
        estadisticas = JSON.parse(datosGuardados);

        let promedio = 0;
        if (estadisticas.partidasFinalizadas > 0) {
            promedio = estadisticas.sumaTotalIntentos / estadisticas.partidasFinalizadas;
        }

        document.getElementById('partidas-jugadas').innerText = estadisticas.partidasFinalizadas;
        document.getElementById('promedio-intentos').innerText = promedio.toFixed(1);
        document.getElementById('mejor-puntaje').innerText = estadisticas.mejorPuntaje !== null ? estadisticas.mejorPuntaje : "-";
    }
}

cargarEstadisticas();

function verificarNumero() {
    let numero = Number(document.getElementById('input-numero').value);
    let resultado = document.getElementById('mensaje-feedback');
    let contadorVisual = document.getElementById('intentos-actuales');

    if (numero < 1 || numero > 1000){
        resultado.innerHTML = 'El número tiene que estar entre 1 y 1000';
        resultado.className = 'alert alert-danger text-center fw-bold shadow-sm';
        return;
    }

    intentos++;
    contadorVisual.innerText = intentos;

    if (numero < numeroRandom) {
        resultado.innerHTML = 'El número es muy bajo, intentá con uno más alto.';
        resultado.className = 'alert alert-warning text-center fw-bold shadow-sm';

    } else if (numero > numeroRandom) {
        resultado.innerHTML = 'El número es muy alto, intentá con uno más bajo.';
        resultado.className = 'alert alert-warning text-center fw-bold shadow-sm';

    } else if (numero === numeroRandom) {
        resultado.innerHTML = '¡Felicidades! Adivinaste el número secreto.';
        resultado.className = 'alert alert-success text-center fw-bold shadow-sm efecto-ganador';

        estadisticas.partidasFinalizadas++;
        estadisticas.sumaTotalIntentos += intentos;

        let promedio = estadisticas.sumaTotalIntentos / estadisticas.partidasFinalizadas;

        if (estadisticas.mejorPuntaje === null || intentos < estadisticas.mejorPuntaje) {
            estadisticas.mejorPuntaje = intentos;
        }

        document.getElementById('partidas-jugadas').innerText = estadisticas.partidasFinalizadas;
        document.getElementById('promedio-intentos').innerText = promedio.toFixed(1);
        document.getElementById('mejor-puntaje').innerText = estadisticas.mejorPuntaje;

        localStorage.setItem('statsJuego', JSON.stringify(estadisticas));
    }
}

function reiniciarPartida() {
    numeroRandom = Math.floor(Math.random() * 1000) + 1;
    intentos = 0;
    document.getElementById('intentos-actuales').innerText = intentos;
    document.getElementById('input-numero').value = '';
    let resultado = document.getElementById('mensaje-feedback');
    resultado.className = 'd-none';
}