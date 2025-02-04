const btnCargar = document.getElementById('btnCargar');
const btnLimpiar = document.getElementById('limpiar');
const lista = document.getElementById('floatingSelect');
const API_URL = 'https://dog.ceo/api/breeds/list/all';
const DEFAULT_IMAGE_SRC = '/img/milinois.jpg';

btnCargar.addEventListener('click', cargarRazas);
btnLimpiar.addEventListener('click', limpiarSeleccion);
lista.addEventListener('change', mostrarImagenRaza);

function cargarRazas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('floatingSelect');
            lista.innerHTML = '<option selected>Selecciona una raza</option>';
            const razas = data.message;
            for (const raza in razas) {
                const option = document.createElement('option');
                option.value = raza;
                option.textContent = raza.charAt(0).toUpperCase() + raza.slice(1);
                lista.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error al cargar las razas:', error);
            const mensaje = document.getElementById('mensaje');
            mensaje.textContent = 'Hubo un error al cargar las razas. Por favor, inténtalo de nuevo más tarde.';
        });
}

function mostrarImagenRaza() {
    const lista = document.getElementById('floatingSelect');
    const razaSeleccionada = lista.value;
    if (razaSeleccionada && razaSeleccionada !== 'Selecciona una raza') {
        const url = `https://dog.ceo/api/breed/${razaSeleccionada}/images/random`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const imagen = document.getElementById('dogejem');
                imagen.src = data.message;
                imagen.alt = `Imagen de un ${razaSeleccionada}`;
            })
            .catch(error => {
                console.error('Error al cargar la imagen de la raza:', error);
                const mensaje = document.getElementById('mensaje');
                mensaje.textContent = 'Hubo un error al cargar la imagen de la raza. Por favor, inténtalo de nuevo más tarde.';
            });
    }
}

function limpiarSeleccion() {
    const lista = document.getElementById('floatingSelect');
    lista.selectedIndex = 0;
    const imagen = document.getElementById('dogejem');
    imagen.src = DEFAULT_IMAGE_SRC;
    imagen.alt = 'dogejem';
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = '';
}



