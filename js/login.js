let button = document.querySelector('#ingresar');    
let email= document.getElementById('email');
let contraseña= document.getElementById('contraseña');


button.addEventListener('click', function () {
    if (email.value == "" || contraseña.value == "")
        alert("Ambos campos deben estar completos.");
    else
        window.location.href = "file:///C:/Users/aglug/Desktop/Proyecto/principal.html"
})