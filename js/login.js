let button = document.querySelector('#ingresar');  
let email= document.getElementById('email');
let contraseña= document.getElementById('contraseña');


button.addEventListener('click', function () {
    if (email.value == "" || contraseña.value == "")
        alert("Ambos campos deben estar completos.");
    else
        window.location.href = "principal.html"
        if(!localStorage.getItem("carrito")){
            let precargado = {
                "id": 50924,
                "name": "Peugeot 208",
                "count": 1,
                "unitCost": 15200,
                "currency": "USD",
                "image": "img/prod50924_1.jpg"
            };
            localStorage.setItem("carrito", JSON.stringify(precargado));
          }
        localStorage.setItem("emailstg", document.querySelector("#email").value);
})




