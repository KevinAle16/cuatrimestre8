const btnCargar = document.getElementById("cargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnCargar.addEventListener('click',cargar);
btnLimpiar.addEventListener('click',limpiar);

function cargar(){
var registros= 0;
const http = new XMLHttpRequest;
const url = "http://jsonplaceholder.typicode.com/albums" ;
http.open('GET',url,true);
http.send();

}
http.onreadystatechange = function(){
// validar la respuesta
if(this.status ==200 && this.readyState==4){

    const datos = JSON.parse(this.responseText);

    datos.forEach(item => {
        ++registros;
    const fila = document.createElement('tr');
        const col1 = document.createElement('td');
            col1.textContent = registros;
            fila.appendChild(col1);
        
            const col2 = document.createElement('td');
            col2.textContent = item.userId;
            fila.appendChild(col2);

            const col3 = document.createElement('td');
            col3.textContent = item.Id;
            fila.appendChild(col3);

            const col4 = document.createElement('td');
            col4.textContent = item.title;
            fila.appendChild(col4);
            tbody.appendChild(fila);

    });
    tabla.appendChild(tbody);
    mensaje.innerHTML = "catidad de tegistros" + registros;


}else mensaje.innerHTML = "surgio un error O Continua"

}

function limpiar(){
    tbody.innerHTML = "";
    mensaje.innerHTML = "";

}