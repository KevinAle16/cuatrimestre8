const btnCargar = document.getElementById('btnCargar');
const btnLimpiar = document.getElementById('limpiar');
const lista = document.getElementById('floatingSelect');
const imagen = document.getElementById('dogejem');
const mensaje = document.getElementById('mensaje');
const API_URL = 'https://dog.ceo/api/breeds/list/all';
const DEFAULT_IMAGE_SRC = '/img/milinois.jpg';

btnCargar.addEventListener('click', cargarImagen);
btnLimpiar.addEventListener('click', limpiar);
document.addEventListener("DOMContentLoaded", cargarRaza);

function cargarRaza() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            lista.innerHTML = "<option selected>Selecciona una raza</option>";
            function agregarOpcion(valor, texto = null) {
                const option = document.createElement('option');
                option.value = valor;
                option.textContent = texto || valor.charAt(0).toUpperCase() + valor.slice(1);
                lista.appendChild(option);
}
            Object.entries(data.message).forEach(([raza, subrazas]) => {
                agregarOpcion(raza);
                subrazas.forEach(subraza => agregarOpcion(`${raza}/${subraza}`, `${raza} ${subraza}`));
            });
        })
        .catch(error => mostrarError('Error al cargar las razas', error));
}

function cargarImagen() {
    const razaSeleccionada = lista.value;
    if (razaSeleccionada && razaSeleccionada !== 'Selecciona una raza') {
    fetch(`https://dog.ceo/api/breed/${razaSeleccionada}/images/random`)
        .then(response => response.json())
            .then(data => {
                imagen.src = data.message;
                imagen.alt = `Imagen de ${razaSeleccionada}`;
            })
            .catch(error => mostrarError('Error al cargar la imagen', error));
    }

}
function limpiar() {
    lista.selectedIndex = 0;
    imagen.src = DEFAULT_IMAGE_SRC;
    mensaje.textContent = '';
}

