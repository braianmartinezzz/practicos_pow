function sumarArreglo(arr) {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i];
  }
  return suma;
}

function mostrarSuma() {
  const entrada = document.getElementById("numeros").value;
  const arreglo = entrada.split(",").map(n => parseInt(n.trim()));
  const total = sumarArreglo(arreglo);
  document.getElementById("resultado").textContent = "Suma: " + total;
}