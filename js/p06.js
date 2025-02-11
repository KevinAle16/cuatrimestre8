const btnMostrar = document.getElementById("btnMostrar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");
const imagen = document.getElementById("coctel");
const imagenCoctel = "/img/cocteles.jpg";

btnMostrar.addEventListener('click', mostrarCoctel);
btnLimpiar.addEventListener('click', limpiar);

function mostrarCoctel() {
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(({data}) => data.drinks ? mostrar(data.drinks[0]) : mensaje.innerHTML = "No se encontró el cóctel")
    .catch(error => mensaje.innerHTML = "Surgió un error: " + error);
}

function mostrar(coctel) {
    limpiar();
    
    const fila = document.createElement('tr');
    const col1 = document.createElement('td');
    fila.appendChild(col1);
    col1.textContent = coctel.strDrink;

    const col2 = document.createElement('td');
    col2.textContent = obtenerIng(coctel);
    fila.appendChild(col2);

    const col3 = document.createElement('td');
    col3.textContent = coctel.strInstructions;
    fila.appendChild(col3);

    const col4 = document.createElement('td');
    col4.textContent = coctel.strAlcoholic;
    fila.appendChild(col4);

    tbody.appendChild(fila);
    imagen.src = coctel.strDrinkThumb;
}

function obtenerIng(coctel) {
    let ingredientes = "";
    for (let i = 1; i <= 15; i++) {
        let ingrediente = coctel[`strIngredient${i}`];
        let medida = coctel[`strMeasure${i}`] || "";
        if (ingrediente) {
            if (ingredientes !== "") {
                ingredientes += ", ";
            }
            ingredientes += medida + " " + ingrediente;
        }
    }
    return ingredientes;
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    imagen.src = imagenCoctel;
}

