function detectarNavegador() {
  const ua = navigator.userAgent;
  let nombre = "Desconocido";

  if (ua.includes("Edg")) {
    nombre = "Microsoft Edge";
  } else if (ua.includes("Chrome") && !ua.includes("Edg")) {
    nombre = "Google Chrome";
  } else if (ua.includes("Firefox")) {
    nombre = "Mozilla Firefox";
  } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
    nombre = "Safari";
  } else if (ua.includes("OPR") || ua.includes("Opera")) {
    nombre = "Opera";
  }

  return nombre;
}

function mostrarInfo() {
  const navegador = detectarNavegador();
  const ancho = window.screen.width;
  const alto = window.screen.height;

  const html = `
    <p><strong>Navegador:</strong> ${navegador}</p>
    <p><strong>Resolución de pantalla:</strong> ${ancho} x ${alto} px</p>
    <p><strong>Width:</strong> ${ancho}px</p>
    <p><strong>Height:</strong> ${alto}px</p>
  `;

  document.getElementById("info").innerHTML = html;
}

mostrarInfo();