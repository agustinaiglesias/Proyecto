let listaProductos = [];
 //array donde tendré los datos recibidos del json

function showAutosList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let listado = array[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${listado.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${listado.image}" alt="${listado.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${listado.name} - ${listado.currency} ${listado.cost}</h4>
                            <small class="text-muted">${listado.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${listado.description}</p>
                    </div>
                </div>
            </div>
            `
            document.getElementById("listado-container").innerHTML = htmlContentToAppend;
    }

};


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            listaProductos = resultObj.data;
            showAutosList(listaProductos.products);
        }
    });
});