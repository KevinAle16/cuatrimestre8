const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");
const titulo = document.getElementById("txtCoctel");
const imagen = document.getElementById("coctel");
const imagenCoctel = "/img/cocteles.jpg";

btnBuscar.addEventListener('click', buscarCoctel);
btnLimpiar.addEventListener('click', limpiar);

function buscarCoctel() {
    if (!titulo.value.trim()) 
        return;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${titulo.value}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            alert("No se encontró el servicio");
        }
        return response.json();
    })
    .then(data => {
        limpiar();
        if (data.drinks === null) {
            mensaje.innerHTML = "Cóctel no encontrado";
        } else {
            mostrar(data.drinks[0]);
        }
    })
    .catch(error => {
        mensaje.innerHTML = "Surgió un error: " + error;
    });
}

function mostrar(coctel) {
    limpiar();
    
    const fila = document.createElement('tr');
    const col1 = document.createElement('td');
    col1.textContent = coctel.strDrink;
    fila.appendChild(col1);

    const col2 = document.createElement('td');
    col2.textContent = obtenerIngr(coctel);
    fila.appendChild(col2);

    const col3 = document.createElement('td');
    col3.textContent = coctel.strInstructions;
    fila.appendChild(col3);

    const col4 = document.createElement('td');
    col4.textContent = coctel.strAlcoholic;
    fila.appendChild(col4);
    
    tbody.appendChild(fila);
    tabla.appendChild(tbody);
    imagen.src = coctel.strDrinkThumb;
}
function obtenerIngr(coctel) {
    let ingredientes = [];
    for (let i = 1; coctel[`strIngredient${i}`]; i++) {
        let medida = coctel[`strMeasure${i}`] || '';
        ingredientes.push(`${medida} ${coctel[`strIngredient${i}`]}`.trim());
    }
    return ingredientes.join(', ');
}

function limpiar() {
    titulo.value = "";
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    imagen.src = imagenCoctel;
}
