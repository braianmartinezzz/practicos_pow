function validarCUIL(cuilIngresado) {
    let cuilLimpio = cuilIngresado.replaceAll('-', '');
    
    if (cuilLimpio.length !== 11) {
        return false;
    }

    let primerosDiez = cuilLimpio.slice(0, 10);
    let digitoVerificadorReal = parseInt(cuilLimpio[10]); 

    let suma = 0;
    let multiplicador = 2;

    for (let i = 9; i >= 0; i--) {
        suma += parseInt(primerosDiez[i]) * multiplicador;
        if (multiplicador > 1 && multiplicador < 7) {
            multiplicador++;
        } else {
            multiplicador = 2;
        }
    }

    let SUMA_MOD11 = suma % 11;
    let ONCEMENOS = 11 - SUMA_MOD11;
    let digitoEsperado;

    if (ONCEMENOS === 11) {
        digitoEsperado = 0;
    } else if (ONCEMENOS === 10) {
        return false;
    } else {
        digitoEsperado = ONCEMENOS;
    }

    return digitoEsperado === digitoVerificadorReal;
}

function verificar() {
    let cuil = document.getElementById('inputCuil').value;
    
    let divResultado = document.getElementById('resultado');
 
    if (cuil.trim() === '') {
        divResultado.style.display = 'block';
        divResultado.className = 'text-center alert alert-warning';
        divResultado.innerHTML = 'Por favor, ingrese un número.';
        return;
    }

    let esValido = validarCUIL(cuil);
    
    divResultado.style.display = 'block';
    if(esValido) {
        divResultado.className = 'text-center alert alert-success';
        divResultado.innerHTML = 'El CUIL/CUIT ingresado es <strong>VÁLIDO</strong>.';
    } else {
        divResultado.className = 'text-center alert alert-danger';
        divResultado.innerHTML = 'El CUIL/CUIT ingresado es <strong>INVÁLIDO</strong>.';
    }
}
