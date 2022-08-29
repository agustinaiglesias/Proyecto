const ORDER_ASC_BY_PRICE = "ME_MA";
const ORDER_DESC_BY_PRICE = "MA_ME";
const ORDER_BY_PROD_REL = "Rel.";

let listaProductos = [];

//console.log(catID);
let currentSortCriteria = undefined;
let minRel = undefined;
let maxRel = undefined;

let buttonASC = document.querySelector('#sortAsc');
let buttonDESC = document.querySelector('#sortDesc');
let buttonREL = document.querySelector('#sortByRel');

let JURL = ""; //ENTREGA 2
let catID = localStorage.getItem("catID");

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    console.log(result);
    return result;
}

function showProductsList(array){

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
                            <small class="text-muted">${listado.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${listado.description}</p>
                    </div>
                </div>
            </div>
            `
            document.getElementById("listado-container").innerHTML = htmlContentToAppend;
    }

};

function sortAndShowProducts(sortCriteria, listaAordenar){
    currentSortCriteria = sortCriteria;

    if(listaAordenar != undefined){
        listaProductos = listaAordenar;
    }

    listaProductos = sortProducts(currentSortCriteria, listaProductos);

    //Muestro las categorías ordenadas
    showProductsList(listaProductos);
}


if (catID == 101)
    JURL = AUTOS_URL;
if(catID == 102)
    JURL = JUGUETES_URL;
if(catID == 103)
    JURL = MUEBLES_URL;


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(JURL).then(function(resultObj){
        if (resultObj.status === "ok"){
            listaProductos = resultObj.data;
            showProductsList(listaProductos.products);
        }
    });
})

buttonASC.addEventListener('click', function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE, listaProductos.products);
});

buttonDESC.addEventListener('click', function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE, listaProductos.products);
});

buttonREL.addEventListener('click', function () {
    sortAndShowProducts(ORDER_BY_PROD_REL, listaProductos.products);
});