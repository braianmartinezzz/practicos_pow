let jsonTurnero = {
    "limite inferior": null,
    "limite superior": null,
    "números": []
};

function cargarSistema() {
    let datosGuardados = localStorage.getItem('datosTurnero');
    if (datosGuardados !== null) {
        jsonTurnero = JSON.parse(datosGuardados);
        
        if (jsonTurnero["limite inferior"] !== null) {
            document.getElementById('limite-inf').value = jsonTurnero["limite inferior"];
            document.getElementById('limite-sup').value = jsonTurnero["limite superior"];
        }
        
        actualizarPantallaHistorial();
    }
}

document.getElementById('btn-guardar-limites').addEventListener('click', function() {
    let inf = parseInt(document.getElementById('limite-inf').value);
    let sup = parseInt(document.getElementById('limite-sup').value);
    let alerta = document.getElementById('mensaje-sistema');

    if (isNaN(inf) || isNaN(sup) || inf >= sup) {
        mostrarAlerta('Los límites son inválidos. El inferior debe ser menor al superior.');
        return;
    }

    jsonTurnero["limite inferior"] = inf;
    jsonTurnero["limite superior"] = sup;
    
    guardarYOcultarAlerta();
    alert("Límites guardados correctamente.");
});

document.getElementById('btn-generar').addEventListener('click', function() {
    let min = jsonTurnero["limite inferior"];
    let max = jsonTurnero["limite superior"];
    
    if (min === null || max === null) {
        mostrarAlerta('Primero debes guardar los límites.');
        return;
    }

    let numerosUsados = jsonTurnero["números"].map(item => item.numero);
    let cantidadTotalPosible = (max - min) + 1;

    // Validación TP: Si no hay más números
    if (numerosUsados.length >= cantidadTotalPosible) {
        mostrarAlerta("Todos los números están generados");
        return;
    }

    // Generar random inicial
    let numeroRandom = Math.floor(Math.random() * cantidadTotalPosible) + min;
    let numeroFinal = numeroRandom;

    // Validación TP: Si está repetido, buscar superior o inferior
    if (numerosUsados.includes(numeroRandom)) {
        let encontrado = false;

        for (let i = numeroRandom + 1; i <= max; i++) {
            if (!numerosUsados.includes(i)) {
                numeroFinal = i;
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            for (let i = numeroRandom - 1; i >= min; i--) {
                if (!numerosUsados.includes(i)) {
                    numeroFinal = i;
                    break;
                }
            }
        }
    }

    // Guardar el número resultante usando la estructura de objetos solicitada
    jsonTurnero["números"].push({ "numero": numeroFinal });
    
    // Mostrar en pantalla y guardar
    document.getElementById('numero-pantalla').innerText = numeroFinal;
    guardarYOcultarAlerta();
    actualizarPantallaHistorial();
});

document.getElementById('btn-reiniciar').addEventListener('click', function() {
    jsonTurnero["números"] = [];
    jsonTurnero["limite inferior"] = null;
    jsonTurnero["limite superior"] = null;
    
    document.getElementById('limite-inf').value = '';
    document.getElementById('limite-sup').value = '';
    document.getElementById('numero-pantalla').innerText = '--';
    
    guardarYOcultarAlerta();
    actualizarPantallaHistorial();
});

// -- Funciones Auxiliares --

function guardarYOcultarAlerta() {
    localStorage.setItem('datosTurnero', JSON.stringify(jsonTurnero));
    document.getElementById('mensaje-sistema').className = 'd-none';
}

function actualizarPantallaHistorial() {
    let historialVisual = document.getElementById('historial-numeros');
    if (jsonTurnero["números"].length === 0) {
        historialVisual.innerText = '-';
    } else {
        // Extrae solo los números y los une con comas
        historialVisual.innerText = jsonTurnero["números"].map(item => item.numero).join(', ');
    }
}

function mostrarAlerta(mensaje) {
    let alerta = document.getElementById('mensaje-sistema');
    alerta.innerText = mensaje;
    alerta.className = 'alert alert-danger small py-2 mt-3 text-center';
}

cargarSistema();