// Capturo los elementos del DOM
const inputBusqueda = document.getElementById('input-busqueda');
const btnBuscar = document.getElementById('btn-buscar');
const tarjeta = document.getElementById('tarjeta-pokemon');
const spinner = document.getElementById('cargando');
const mensajeError = document.getElementById('mensaje-error');

// Elementos internos de la tarjeta
const pokeNombre = document.getElementById('poke-nombre');
const pokeImg = document.getElementById('poke-img');
const pokeId = document.getElementById('poke-id');
const pokePeso = document.getElementById('poke-peso');
const pokeAltura = document.getElementById('poke-altura');
const pokeTipos = document.getElementById('poke-tipos');

function buscarPokemon(termino) {
    // Si el usuario presiona buscar sin escribir nada, no hacemos nada
    if (termino === '') return;

    // Reseteo la vista: 
    //      1. Se oculta la tarjeta y errores
    //      2. Muestro spinner

    tarjeta.classList.add('d-none');
    mensajeError.classList.add('d-none');
    spinner.classList.remove('d-none');

    // La API de Pokémon requiere que los nombres estén en minúsculas
    let busquedaFormateada = termino.toLowerCase();
    
    // Llamada AJAX a la PokeAPI
    fetch(`https://pokeapi.co/api/v2/pokemon/${busquedaFormateada}`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("No encontrado");
            }
            return respuesta.json();
        })
        .then(datos => {
            // Ocultamos el spinner
            spinner.classList.add('d-none');
            
            // --- INYECTAMOS LOS DATOS EN EL HTML ---
            
            pokeNombre.innerText = datos.name;
            pokeId.innerText = `#${datos.id}`;
            
            // PokeAPI manda el peso en hectogramos y la altura en decímetros, lo divido por 10
            pokePeso.innerText = datos.weight / 10; 
            pokeAltura.innerText = datos.height / 10;
            
            // La imagen oficial en alta calidad dentro del JSON
            pokeImg.src = datos.sprites.other['official-artwork'].front_default;

            // Procesamos los tipos del Pokémon (vienen en un array)
            pokeTipos.innerHTML = ''; // Limpio los tipos anteriores
            datos.types.forEach(item => {
                // Creo un 'badge' de Bootstrap por cada tipo que tenga
                let spanTipo = document.createElement('span');
                spanTipo.className = 'badge bg-dark me-2 px-3 py-2 text-capitalize shadow-sm';
                spanTipo.innerText = item.type.name;
                pokeTipos.appendChild(spanTipo);
            });

            tarjeta.classList.remove('d-none');
        })
        .catch(error => {
            // Si la promesa falla (ej: escribió "agumon" que es de Digimon)
            spinner.classList.add('d-none');
            mensajeError.classList.remove('d-none');
        });
}

btnBuscar.addEventListener('click', () => {
    buscarPokemon(inputBusqueda.value.trim());
});

inputBusqueda.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        buscarPokemon(inputBusqueda.value.trim());
    }
});

buscarPokemon('pikachu');