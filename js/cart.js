let sub;
let envio;

function calcularEnvio(){
    if(document.getElementById("premium").checked){
        envio = sub * 0.15;
    }else if(document.getElementById("express").checked){
        envio = sub * 0.07;
    }else if(document.getElementById("standard").checked){
        envio = sub * 0.05;
    }
    
    let htmlContentToAppend="";
    htmlContentToAppend += `
    <p>Subotal: USD$${Math.round(sub)}</p>
    <p>Envío: USD$${Math.round(envio)}</p>
    <p>Total: USD$${Math.round(sub+envio)} </p>
    `
    document.getElementById("totaless").innerHTML =  htmlContentToAppend;
}


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

//calcula el subtotal con los eltos que hay en el carrito
function subtotalInicial(articulos){
  console.log(articulos);
  sub = 0;
    for (i= 0; i<articulos.length; i++){
        if (articulos[i].currency == 'UYU'){                
            sub += (articulos[i].unitCost / 41.23) * articulos[i].count;
        }else{
          console.log("else");
            sub += (articulos[i].unitCost * articulos[i].count);
        }
    }
    calcularEnvio();
    let htmlContentToAppend="";
    htmlContentToAppend += `
    <p>Subotal: USD$${Math.round(sub)}</p>
    <p>Envío: USD$${Math.round(envio)}</p>
    <p>Total: USD$${Math.round(sub+envio)} </p>
    `
    document.getElementById("totaless").innerHTML =  htmlContentToAppend;
}

//agrega un evento input a c/input
function subTotal(i, articulo){    
        let input = document.getElementById(i);
        input.addEventListener("input", function(e){
            let htmlContentToAppend = `
                Subtotal: ${articulo[i].currency}  ${(articulo[i].unitCost * input.value)}
            `
            document.getElementsByClassName("subtotal")[i].innerHTML = htmlContentToAppend;

            //Para cambiar el count en el localStorage
            carro = " [ " + (localStorage.getItem("carrito")) + " ] ";
            carro = JSON.parse(carro);
            let index = carro.findIndex(producto => producto.id === articulo[i].id);
            carro[index].count = input.value;
            carro = JSON.stringify(carro);
            carro = carro.replace("[", "");
            carro = carro.replace("]", "");
            localStorage.setItem("carrito",carro);

            // agregar al subtotal
            carro = " [ " + (localStorage.getItem("carrito")) + " ] ";
            carro = JSON.parse(carro);
            subtotalInicial(carro);
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
                        <input  onclick="calcularEnvio()" type="radio" id="premium" name="radio" value="0.15"/>
                        <span>Premium 2 a 5 días (%15)</span>
                    </label>
                    <label>
                        <input onclick="calcularEnvio()" type="radio" id="express" name="radio"  value="0.07"/>
                        <span>Express 5 a 8 días (%7)</span>
                    </label>
                    <label>
                        <input onclick="calcularEnvio()" type="radio" id="standard" name="radio" value="0.05"/>
                        <span>Standard 12 a 15 días (%5)</span>
                    </label>
                </form>
            </div>
            
        <form
          id="formulario"
          action="#"
          method="get"
          class="row mt-2 needs-validation"
          novalidate
        >
          <div class="col">
            <div class="row g-2">
              <div class="col-sm-8">
                <div>
                  <label for="calle" class="form-label">Calle:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="calle"
                    required
                  />
                  <div class="invalid-feedback">Debe ingresar una calle.</div>
                </div>
              </div>

              <div class="col-sm-4">
                <div>
                  <label for="numero" class="form-label">Número:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="calle"
                    required
                  />
                  <div class="invalid-feedback">Debe ingresar un número.</div>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <label for="esquina" class="form-label">Esquina:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="esquina"
                    required
                  />
                  <div class="invalid-feedback">
                    Debe ingresar una esquina.
                  </div>
                </div>
              </div>

              <div class="col-sm-12">
              <div class="row">
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn btn-link ps-0"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTerminos"
                    id="modalInvalido"
                  >
                    Seleccionar forma de pago
                  </button>
                </div>

                <div
                  id="modalInvalido"
                  class="d-none text-danger col-auto d-flex align-items-center"
                >
                  Debe seleccionar una froma de pago.
                </div>
              </div>
            </div>


              <div id="totaless">
              <p>Subotal: USD$${Math.round(sub)}</p>
              <p>Envío: USD$${Math.round(envio)}</p>
              <p>Total: USD$${Math.round(sub+envio)} </p>
              </div>
              <button id="botonPagar" class="btn btn-outline-secondary " type="submit">
                 Comprar
             </button>
            

            </form>
            <div class="modal fade" id="modalTerminos" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                    <form
                    id="formularioModal"
                    action="#"
                    method="get"
                    class="row mt-2 needs-validation"
                    novalidate
                    >
                    <label>
                        <input onclick="activarCampos()" type="radio" id="tarjeta" name="radio"/>
                        <span>Tarjeta de crédito (%15)</span>
                    </label>
                    <hr>
                    <div class="row g-2">
                    <div class="col-sm-10">
                        <label for="numero" class="form-label "  >Número de tarjeta:</label>
                        <input
                            type="number"
                            class="form-control"
                            id="numeroTarjeta"
                            required
                            disabled
                        />
                        <div class="invalid-feedback">Debe ingresar una tarjeta.</div>
                        <label>
                    </div>
                    <div class="col-sm-2">
                    <label for="cvc" class="form-label">CVC:</label>
                    <input
                        type="number"
                        class="form-control"
                        id="cvc"
                        required
                        disabled
                    />
                    <div class="invalid-feedback">CVC.</div>
                    </div>
                    </div>
                    <div class="col-sm-12">
                        <label for="vencimiento" class="form-label">Vencimiento:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="vencimiento"
                            required
                            disabled
                        />
                        <div class="invalid-feedback">Debe ingresar fecha de vencimiento.</div>
                    </div>
                    <label>
                        <input onclick="activarCampos()" type="radio" id="transferencia" name="radio"/>
                        <span>Transferencia bancaria (%7)</span>
                    </label>
                    <hr>
                    <div class="col-sm-12">
                        <label for="numeroCuenta" class="form-label">Número de cuenta:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="numeroCuenta"
                            required
                            disabled
                        />
                        <div class="invalid-feedback">Debe ingresar una cuenta.</div>
                    </div>
                    
                </form>
                    </div>
                    
                </div>
      </div>

        
    `
    document.getElementById("cartRight").innerHTML = htmlContentToAppend;
}

//segun la opcion, activa los campos correspondientes
function activarCampos(){
  if (document.getElementById("tarjeta").checked){
    document.getElementById("cvc").disabled=false;
    document.getElementById("vencimiento").disabled=false;
    document.getElementById("numeroTarjeta").disabled=false;
    document.getElementById("numeroCuenta").disabled=true;
  }
  if(document.getElementById("transferencia").checked){
    document.getElementById("cvc").disabled=true;
    document.getElementById("vencimiento").disabled=true;
    document.getElementById("numeroTarjeta").disabled=true;
    document.getElementById("numeroCuenta").disabled=false;
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  console.log("DOM");
            sub = 0;
            envio = 0;
            carrito = "[" + (localStorage.getItem("carrito")) + "]";
            
            showCartDetails();
            subtotalInicial(JSON.parse(carrito));
            showCart(JSON.parse(carrito));
            subTotales(JSON.parse(carrito));
            
            
  const form = document.getElementById("formulario");
  const formModal = document.getElementById("formularioModal");

  let formFlag = false;
  let formFlagModal = false;

  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!formFlagModal) {
      formModal.classList.add("was-validated");
    }
    if (!formFlag) {
      form.classList.add("was-validated");
    }


    if (form.checkValidity() && formModal.checkValidity() && (document.getElementById("transferencia").checked|| document.getElementById("tarjeta").checked ) ){
      form.classList.remove("was-validated");
      formModal.classList.remove("was-validated");
      document.getElementById("modalInvalido").classList.remove("text-danger");

      form.parentElement.innerHTML += `
        <div class="alert alert-success alert-dismissible position-absolute top-0 start-50 translate-middle-x mt-4 fade show" role="alert">
            ¡Pago exitoso!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

      document
        .getElementById("botonPagar")
        .setAttribute("disabled", "true");
    
    } else {
      if (!formFlag) {
        const modalInvalido = document.getElementById("modalInvalido");
        modalInvalido.classList.remove("d-none");
        modalInvalido.classList.add("text-danger");
      }
    }

    modalInvalido.addEventListener("change", () => {
      if(formModal.checkValidity()){        
        modalInvalido.classList.remove("text-danger");
      }
    });
  });
});

