let productID = localStorage.getItem("prodID");
let email = localStorage.getItem("email");
let currentProduct;
let catID = localStorage.getItem("catID");

function showProduct(producto) {

    let htmlContentToAppend = "";
    htmlContentToAppend += `
            
            <div class="at-container">
                <div class="atributos-cont">
                    <p class="atributosProd"> <b>Precio:</b> $${producto.cost}</p>
                    <p class="atributosProd"><b>Descripción:</b> ${producto.description}</p>
                    <p class="atributosProd"><b>Categoría:</b> ${producto.category}</p>
                    <p class="atributosProd"><b>Cantidad de vendidos:</b> ${producto.soldCount} vendidos</p>
                </div>
            </div>
            `

    document.getElementById("descripcion-container").innerHTML = htmlContentToAppend;
    htmlContentToAppend = "";
    htmlContentToAppend += `
            
            <h1>${producto.name} </h1>
            `
    document.getElementById("nombreProducto").innerHTML = htmlContentToAppend;
    
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
    let htmlContentToAppend = "";
    for (let i = 0; i < imgArray.length; i++) {
        let imagen = imgArray[i];


        htmlContentToAppend += `
                
                <div class="foto">
                <img src="${imagen}" alt=""></img>                
                </div>
                `

        document.getElementById("galeria").innerHTML = htmlContentToAppend;
    };
    

}

function avisar(){
    if (email == ""){
        alert("Debe estar logeado para comentar.")
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data
            //console.log(currentProductsArray);
            showProduct(currentProduct);
            console.log(currentProduct.images);
            showImg(currentProduct.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductComments = resultObj.data
            //console.log(currentProductsArray);
            showProductComments(currentProductComments);
        }
    });
});