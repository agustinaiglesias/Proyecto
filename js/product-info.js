let productID = localStorage.getItem("prodID");
let email = localStorage.getItem("emailstg");
let carro; 
let currentProduct;
let catID = localStorage.getItem("catID");
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

function showProduct(producto) {

    let htmlContentToAppend = "";
    htmlContentToAppend += `
            
            <div class="at-container">
            <h3 class="py-2 border-bottom border-dark" data-aos="fade-left">${producto.name}</h3>
                <div class="atributos-cont">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        `
        }
        htmlContentToAppend += `
                
        <div class="col-12 col-lg-6 col-xl-4" data-aos="fade-right">
        <div class="card p-4 mt-3 border-0">
          <div class="card-body">
            <div class="text-dark py-2 fs-3">
            ${estrellas} 
            </div>
            <blockquote class="blockquote">
              <p>"${comentario.description}"</p>
            </blockquote>
            <div class="d-flex justify-content-between border-top pt-3">
              <div>
                <span class="h6 fw-5">${comentario.user}</span><br>
                <small class="text-muted">${comentario.dateTime}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    `
                    }
        let htmlContentToAppend = "";
        htmlContentToAppend += `
        <div class="col-12 col-lg-6 col-xl-4" data-aos="fade-right">
        <div class="card p-4 mt-3 border-0">
          <div class="card-body">
            <div class="text-dark py-2 fs-3">
            ${estrellas} 
            </div>
            <blockquote class="blockquote">
              <p>"${comentario}"</p>
            </blockquote>
            <div class="d-flex justify-content-between border-top pt-3">
              <div>
                <span class="h6 fw-5">${email}</span><br>
                <small class="text-muted">${fecha}</small>
              </div>
            </div>
          </div>
        </div>
      </div> `

               
        document.getElementById("comentarios-container").innerHTML += htmlContentToAppend;
            
}

function showRecomendados(producto){
    let htmlContentToAppend = "";
    let recomendados = producto.relatedProducts;
        htmlContentToAppend += `
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img onclick="redireccionar(${recomendados[0].id})" src="${recomendados[0].image}" class="d-block w-100" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>${recomendados[0].name}</h5>
        <p>Toca la imagen para ir al producto.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img onclick="redireccionar(${recomendados[1].id})" src="${recomendados[1].image}" class="d-block w-100" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>${recomendados[1].name}</h5>
        <p>Toca la imagen para ir al producto.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        
        `

        document.getElementById("recomendados").innerHTML += htmlContentToAppend;
}

function redireccionar(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}



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
  if(!carrito){
    localStorage.setItem("carrito", JSON.stringify(nuevoItem));
  }
  if(carrito == ""){
      localStorage.setItem("carrito",carrito + JSON.stringify(nuevoItem));
  }
  if(!carrito.includes(product.id)){
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

    document.addEventListener("DOMContentLoaded", function (e) {
    
        getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                currentProduct = resultObj.data
                console.log(currentProduct);
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