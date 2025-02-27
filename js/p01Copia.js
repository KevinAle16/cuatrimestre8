const btnCargarDatos = document.getElementById("cargarDatos");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnCargarDatos.addEventListener('click', cargarDatos);
btnLimpiar.addEventListener('click', limpiar);

function cargarDatos() {
    const url = "https://jsonplaceholder.typicode.com/albums";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                mensaje.innerHTML = "Error al solicitar datos: " + response.status;
            }
            return response.json();
        })
        .then(data => {
            limpiar();
            mostrar(data);
        })
        .catch((error) => {
            mensaje.innerHTML = "Surgió un error: " + error;
        });
}

function mostrar(data) {
    let registros = 0;

    data.forEach(item => {
        registros++;
        const fila = document.createElement('tr');

        const col1 = document.createElement('td');
        col1.textContent = registros;
        fila.appendChild(col1);

        const col2 = document.createElement('td');
        col2.textContent = item.userId;
        fila.appendChild(col2);

        const col3 = document.createElement('td');
        col3.textContent = item.id;
        fila.appendChild(col3);

        const col4 = document.createElement('td');
        col4.textContent = item.title;
        fila.appendChild(col4);

        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    mensaje.innerHTML = "Cantidad de registros: " + registros;
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
}
