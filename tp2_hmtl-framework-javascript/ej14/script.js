// Selecciona todas las imágenes de la galería
const imagenes = document.querySelectorAll(".galeria img");

imagenes.forEach(function (img) {
  // a. onMouseOver: destacar la imagen
  img.addEventListener("mouseover", function () {
    img.classList.add("destacada");
  });

  // b. onMouseOut: restablecer apariencia habitual
  img.addEventListener("mouseout", function () {
    img.classList.remove("destacada");
  });

  // c. onClick: cambia la imagen por otra (guardada en data-alt)
  img.addEventListener("click", function () {
    const srcActual = img.src;
    const srcAlterna = img.getAttribute("data-alt");

    img.src = srcAlterna;
    img.setAttribute("data-alt", srcActual); // guarda la anterior para poder volver a hacer click
  });
});

// --- Alternativa para el punto c: abrir ventana de impresión ---
// En vez de cambiar la imagen, se podría abrir el diálogo de impresión
// del navegador. Para usar esta versión, comentar el listener "click"
// de arriba y descomentar este bloque:
//
// imagenes.forEach(function (img) {
//   img.addEventListener("click", function () {
//     window.print();
//   });
// });