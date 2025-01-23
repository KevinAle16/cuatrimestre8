const btnBuscar = document.getElementById("buscar");
const inputAlbum = document.getElementById("idAlbum");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnBuscar.addEventListener('click',buscar);
btnLimpiar.addEventListener('click',limpiar);

function buscar(){
    tbody.innerHTML = ""
    mensaje.innerHTML="";

    if(inputAlbum.value == ""){
        alert("no se coloco ninguna id")
        return;
    }
const idAlmun = inputAlbum.value;
const http = new XMLHttpRequest();
const url = "https://jsonplaceholder.typicode.com/albums/" + idAlmun
http.open('GET',url,true);
http.send();

http.onreadystatechange = function(){
if(this.readyState ==4) {
    if(this.status==200){
        const album = JSON.parse(this.responseText);
            
            const fila = document.createElement('tr');
            const colum1 = document.createElement('td');
            colum1.textContent = album.userId;
            fila.appendChild(colum1);
        
            const colum2 = document.createElement('td');
            colum2.textContent = album.id;
            fila.appendChild(colum2);

            const colum3 = document.createElement('td');
            colum3.textContent = album.title;
            fila.appendChild(colum3);

            tbody.appendChild(fila);  
    mensaje.innerHTML = "Datos cargados correctamente";

}else if (this.status === 404){ 
    mensaje.innerHTML = "ID erroneo o no encontrado";
} else { 
    mensaje.innerHTML = "Ocurrio un error inesperado";
        }
    }
}
}
function limpiar(){
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    inputAlbum.value="";

}