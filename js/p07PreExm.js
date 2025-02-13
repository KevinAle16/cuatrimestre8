const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");
const titulo = document.getElementById("txtpais");
const imagen = document.getElementById("mundo");
const imagenDefault = "/img/mundo.jpg";

btnBuscar.addEventListener('click', buscarPais);
btnLimpiar.addEventListener('click', limpiar);

function buscarPais() {
    if (!titulo.value.trim()) 
        return;
    const url = `https://restcountries.com/v3.1/name/${titulo.value}?fields=name,population,flags,capital`;

    axios.get(url)
        .then(response => {
            limpiar();
            console.log(response.data);
            if (!response.data || response.data.length === 0) {
                mensaje.innerHTML = "País no encontrado";
            } else {
                mostrar(response.data[0]);
            }
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió un error: " + error.message;
        });
}

function mostrar(pais) {
    limpiar();
    
    const fila = document.createElement('tr');
    fila.innerHTML = 
        `<td>${pais.name.official}</td><td>${pais.name.common}</td>
        <td>${pais.population.toLocaleString()}</td>
        <td>${pais.capital ? pais.capital.join(", ") : "N/A"}</td>`;
    
    tbody.appendChild(fila);
    tabla.appendChild(tbody);
    
    imagen.src = pais.flags.svg;
    imagen.style.display = "block";
}

function limpiar() {
    titulo.value = "";
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    imagen.src = imagenDefault;
   
}
