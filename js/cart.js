let cartInfo;
let precio;

function showCart(articulos){
    let htmlContentToAppend = "";
    
    for (i=0; i<articulos.length; i++){
        let articulo = articulos[i];
        
        htmlContentToAppend += `
        <div class="blog-post">
            <div class="blog-post_img">
            <img src=${articulo.image}></img>
            </div>
            <div class="blog-post_info">
            
            <h1 class="blog-post_title">${articulo.name}</h1>
            <br></br>
                <p class="blog-post_text subtotal">Subtotal: ${articulo.currency}  ${(articulo.unitCost * articulo.count)}</p>
                <input type="number" class="blog-post_cta" id="${i}" value="${articulo.count}"></input>
                <button onclick="eliminarDelCarrito(${articulo.id})" href="#" class="delete blog-post_cta">Eliminar</button>
            </div>
        </div>               
        `  
    
        
    }
    document.getElementById("articulos").innerHTML = htmlContentToAppend;
   
}

function subTotal(i, articulo){    
        let input = document.getElementById(i);
        input.addEventListener("input", function(e){
            let htmlContentToAppend = `
                Subtotal: ${articulo[i].currency}  ${(articulo[i].unitCost * input.value)}
            `
            document.getElementsByClassName("subtotal")[i].innerHTML = htmlContentToAppend;

            carro = " [ " + (localStorage.getItem("carrito")) + " ] ";
            carro = JSON.parse(carro);
            let index = carro.findIndex(producto => producto.id === articulo[i].id);
            carro[index].count = input.value;
            carro = JSON.stringify(carro);
            carro = carro.replace("[", "");
            carro = carro.replace("]", "");
            localStorage.setItem("carrito",carro);

        })
}

function subTotales (articulos){
    for (i= 0; i<articulos.length; i++){
        subTotal(i, articulos);
    }
}

function eliminarDelCarrito(e){
    carro = " [ " + (localStorage.getItem("carrito")) + " ] ";
    carro = JSON.parse(carro);
    let index = carro.findIndex(producto => producto.id === e);
    carro.splice(index, 1);
    carro = JSON.stringify(carro);
    carro = carro.replace("[", "");
    carro = carro.replace("]", "");
    localStorage.setItem("carrito",carro);
    location.reload();
}

function showCartDetails(){
    let htmlContentToAppend = "";
    htmlContentToAppend = `
        <h1>Mi carrito</h1>
        <div class="detailsContainer">
            <h2>Tipo de envío: </h2>
            <div class="containerRatio">
                <form action="">
                    <label>
                        <input type="radio" id="premium" name="radio" />
                        <span>Premium 2 a 5 días (%15)</span>
                    </label>
                    <label>
                        <input type="radio" id="express" name="radio" checked/>
                        <span>Express 5 a 8 días (%7)</span>
                    </label>
                    <label>
                        <input type="radio" id="standard" name="radio"/>
                        <span>Standard 12 a 15 días (%5)</span>
                    </label>
                </form>
            </div>
            <h2 class="detalles">Detalles de envío: </h2>
            <div class="txt_field">
                <label for="calle" class="form-label"></label>
                <input type="text" class="form-control" id="calle" placeholder="Calle:">
            </div>
            <div class="txt_field">
                <label for="numero" class="form-label"></label>
                <input type="number" class="form-control" id="numero" placeholder="Número:">
            </div>
            <div class="txt_field">    
                <label for="esquina" class="form-label"></label>
                <input type="text" class="form-control" id="esquina" placeholder="Esquina:">
            </div>
            <h2>Total: $0</h2>
        </div>
        
    `
    document.getElementById("cartRight").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function (e) {

            carrito = "[" + (localStorage.getItem("carrito")) + "]";

            showCart(JSON.parse(carrito));
            showCartDetails();
            subTotales(JSON.parse(carrito));
          
});

