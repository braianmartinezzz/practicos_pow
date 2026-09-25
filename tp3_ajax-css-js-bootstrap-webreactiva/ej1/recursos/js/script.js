let numeroRandom = Math.floor(Math.random() * 1000) + 1;
let intentos = 0;

// Contadores historicos
let partidasFinalizadas = 0;
let sumaTotalIntentos = 0;
let mejorPuntaje = null;

function verificarNumero() {
    let numero = Number(document.getElementById('input-numero').value);
    let resultado = document.getElementById('mensaje-feedback');
    let contadorVisual = document.getElementById('intentos-actuales');

    if (numero === 0) return;

    intentos++
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

        partidasFinalizadas++;
        sumaTotalIntentos += intentos;

        let promedio = sumaTotalIntentos / partidasFinalizadas;

        if (mejorPuntaje === null || intentos < mejorPuntaje) {
            mejorPuntaje = intentos;
        }

        document.getElementById('partidas-jugadas').innerText = partidasFinalizadas;
        document.getElementById('promedio-intentos').innerText = promedio.toFixed(1); // .toFixed(1) deja un solo decimal
        document.getElementById('mejor-puntaje').innerText = mejorPuntaje;
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