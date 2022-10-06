let productID = localStorage.getItem("prodID");
let email = localStorage.getItem("emailstg");
let currentProduct;
let catID = localStorage.getItem("catID");
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

function showProduct(producto) {

    let htmlContentToAppend = "";
    htmlContentToAppend += `
            
            <div class="at-container">
                <div class="atributos-cont">
                <h1>${producto.name} </h1>
                    <p class="atributosProd"> <b>Precio:</b> $${producto.cost}</p>
                    <p class="atributosProd"><b>Descripción:</b> ${producto.description}</p>
                    <p class="atributosProd"><b>Categoría:</b> ${producto.category}</p>
                    <p class="atributosProd"><b>Cantidad de vendidos:</b> ${producto.soldCount} vendidos</p>
                </div>
            </div>
            `

    document.getElementById("descripcion-container").innerHTML = htmlContentToAppend;
       
};

function showProductComments(comentariosArray) {

    let htmlContentToAppend = "";
    for (let i = 0; i < comentariosArray.length; i++) {
        let comentario = comentariosArray[i];
        let estrellas = "";
        let j = 0;
        for (j; j < comentario.score; j++) {
            estrellas += `        
        <span class="fa fa-star checked"></span>
        `
        }
        if (j < 5) {
            for (j; j < 5; j++) {
                estrellas += `
                    
            <span class="fa fa-star"></span>
            `
            }
        }
        htmlContentToAppend += `
                
                <p class="user"> ${comentario.user} / ${comentario.dateTime} / ${estrellas} </p>
                <p class="comentario">${comentario.description}</p>
                
                <hr>
                `
        document.getElementById("comentarios-container").innerHTML = htmlContentToAppend;
    };
};


function showImg(imgArray) {
    let imagen1 = imgArray[0];
    let imagen2 = imgArray[1];
    let imagen3 = imgArray[2];
    let imagen4 = imgArray[3];
    let htmlContentToAppend = "";
    
        htmlContentToAppend += `
                
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${imagen1}" class="d-block w-100" alt="">
          </div>
          <div class="carousel-item">
            <img src="${imagen2}" class="d-block w-100" alt="">
          </div>
          <div class="carousel-item">
            <img src="${imagen3}" class="d-block w-100" alt="">
          </div>
          <div class="carousel-item">
            <img src="${imagen4}" class="d-block w-100" alt="">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    

                
                `

        document.getElementById("galeria").innerHTML = htmlContentToAppend;
    };
    



function comentar(){
        let comentario = document.getElementById("comentarioIn").value;
        let score = document.getElementById("score").value;
        let fecha =  `
                    ${hoy.getFullYear()}-0${hoy.getUTCMonth()+1}-0${hoy.getUTCDay()} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()} `
        let estrellas = "";
        let j = 0;
        for (j; j <= score; j++) {
            estrellas += `        
        <span class="fa fa-star checked"></span>
        `
        }
        if (j < 5) {
            for (j; j < 5; j++) {
                estrellas += `
                    
            <span class="fa fa-star"></span>
            `
            }
        }
        let htmlContentToAppend = "";
        htmlContentToAppend += `
                
                <p class="user"> ${email} / ${fecha} / ${estrellas} </p>
                <p class="comentario">${comentario}</p>
                <hr> `
        document.getElementById("comentarios-container").innerHTML += htmlContentToAppend;
            
}

function showRecomendados(producto){
    let htmlContentToAppend = "";
    let recomendados = producto.relatedProducts;
        htmlContentToAppend += `
                
        <div class="card">
            <img onclick="redireccionar(${recomendados[0].id})" src="${recomendados[0].image}">
            <h4>${recomendados[0].name}</h4>
        </div>
        
        <div class="card">
            <img onclick="redireccionar(${recomendados[1].id})" src="${recomendados[1].image}">
            <h4>${recomendados[1].name}</h4>
        </div>
        
        `

        document.getElementById("recomendados").innerHTML += htmlContentToAppend;
}

function redireccionar(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data
            showProduct(currentProduct);
            showImg(currentProduct.images);
            showRecomendados(currentProduct);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductComments = resultObj.data
            showProductComments(currentProductComments);
        }
    });

    
});

document.getElementById("enviarBoton").addEventListener("click", function(e){
    e.preventDefault();
    comentar();
})
    

let carrito = localStorage.getItem("carrito");
let nuevoItem;

document.getElementById("agregarCarrito").addEventListener("click", function(e){
    e.preventDefault();
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data;
            agregarCarro(currentProduct);
        }
    });
    
})


let carro; 

function agregarCarro(product){
    let nuevoItem = {
        id : product.id,
        name :  product.name,
        count : 1,
        unitCost : product.cost,
        currency : product.currency,
        image: product.images[0]
    }
            
    console.log(nuevoItem);
    if(carrito == ""){
        localStorage.setItem("carrito",carrito + JSON.stringify(nuevoItem));
    }
    else if(!carrito.includes(product.id)){
        localStorage.setItem("carrito",carrito +',' + JSON.stringify(nuevoItem));
    }else{
        carro = " [ " + (localStorage.getItem("carrito")) + " ] ";
        carro = JSON.parse(carro);
        let index = carro.findIndex(producto => producto.id === product.id);
        carro[index].count++;
        carro = JSON.stringify(carro);
        carro = carro.replace("[", "");
        carro = carro.replace("]", "");
        //console.log(carro)
        localStorage.setItem("carrito",carro);
    }
}