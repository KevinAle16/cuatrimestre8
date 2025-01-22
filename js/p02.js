const btnBuscar = document.getElementById("buscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnBuscar.addEventListener('click',buscar);
btnLimpiar.addEventListener('click',limpiar);


function buscar(){
    limpiar();
    const Id = document.getElementById("idjson").value;

    if(!Id){
        mensaje.innerHTML = "No capturaste ninguna ID";
        return;
    }

const http = new XMLHttpRequest();
const url = "https://jsonplaceholder.typicode.com/users"
http.open('GET',url,true);
http.send();

http.onreadystatechange = function(){
if(this.readyState ==4 && this.status==200){
    const datos = JSON.parse(this.responseText);
    const datosid = datos.filter(item => item.id == parseInt(Id))
    if(datosid.length > 0){
        datosid.forEach(item =>{
        
            const fila = document.createElement('tr');
            const colum1 = document.createElement('td');
            colum1.textContent = item.id;
            fila.appendChild(colum1);
        
            const colum2 = document.createElement('td');
            colum2.textContent = item.name;
            fila.appendChild(colum2);

            const colum3 = document.createElement('td');
            colum3.textContent = item.username;
            fila.appendChild(colum3);

            const colum4 = document.createElement('td');
            colum4.textContent = item.email;
            fila.appendChild(colum4);

            const colum5 = document.createElement('td');
            colum5.textContent = `${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}, ${item.address.geo.lat}, ${item.address.geo.lng}`;
            fila.appendChild(colum5);

            const colum6 = document.createElement('td');
            colum6.textContent = item.phone;
            fila.appendChild(colum6);
            
            const colum7 = document.createElement('td');
            colum7.textContent = item.website;
            fila.appendChild(colum7);

            const colum8 = document.createElement('td');
            colum8.textContent = `${item.company.name}, ${item.company.catchPhrase}, ${item.company.bs}`;
            fila.appendChild(colum8);

            tbody.appendChild(fila);

    });
    
    mensaje.innerHTML = "Datos cargados correctamente";

}else{ 
    mensaje.innerHTML = "ID erroneo o no encontrado";
}
}else if(this.readyState == 4){ 
    mensaje.innerHTML = "Ocurrio un error inesperado";
}
}
}
function limpiar(){
    tbody.innerHTML = "";
    mensaje.innerHTML = "";

}