
let nombre;
let nombre2;
let apellido;
let apellido2;
let email;
let numero;

let arrayUsers = [];
const users = localStorage.getItem("users");


function rellenarCampos() {
    let emailstg = localStorage.getItem("emailstg");
    document.getElementById("email").value = emailstg;
    if(users){
        arrayUsers = JSON.parse(users);
        let index = arrayUsers.findIndex(user => user.email === emailstg);
        if (index !== -1){
            document.getElementById("nombre").value = arrayUsers[index].nombre;
            document.getElementById("2nombre").value = arrayUsers[index].nombre2;
            document.getElementById("apellido").value = arrayUsers[index].apellido;
            document.getElementById("2apellido").value = arrayUsers[index].apellido2;
            document.getElementById("numero").value = arrayUsers[index].numero; 
        }
    }
}

function guardarDatos() {
    let nuevoUser = {
        "nombre": nombre,
        "nombre2": nombre2,
        "apellido": apellido,
        "apellido2": apellido2,
        "email": email,
        "numero": numero
    };
    if(users){
        arrayUsers = JSON.parse(users);
        console.log(arrayUsers);
        if(!users.includes(email)){
            arrayUsers.push(nuevoUser);   
            localStorage.setItem("users", JSON.stringify(arrayUsers));
            }else{
                let index = arrayUsers.findIndex(user => user.email === email);
                arrayUsers[index] = nuevoUser;
                localStorage.setItem("users", JSON.stringify(arrayUsers));
            }
    }else{
        arrayUsers = [];
        arrayUsers.push(nuevoUser);
        localStorage.setItem("users", JSON.stringify(arrayUsers));
    }
    

         //Si sus datos no existen en la base de datos entonces se agregan,
        // en el caso contrario se modifican.
    
}


document.addEventListener("DOMContentLoaded", function (e) {
    //Si no está logeado: 
    if (!localStorage.getItem("emailstg")) {
        let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div class="bg-white p-5 text-secondary shadow" style="width: 50rem">
    <h1>Debe estar logeado!</h1>
    <div class="col-12">
            <button id="loginButton" type="submit" class="btn btn-dark botonGuardar">Iniciar sesión</button>
          </div>
    </div>`
    document.getElementById("loginContainer").innerHTML = htmlContentToAppend;
    document.getElementById("loginButton").addEventListener("click", (e) => {
        window.location = "index.html"
    });
    }
    //Si estan logeados:
    else{
        const recentImageDataUrl = localStorage.getItem("image");
        if(recentImageDataUrl){
            document.getElementById("imagen").setAttribute("src", recentImageDataUrl);
        }
        rellenarCampos();
        document.getElementById("myFileInput").addEventListener("change", function() {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                localStorage.setItem("image", reader.result);
                
            });
            reader.readAsDataURL(this.files[0]);
        });

        const form = document.getElementById("formulario");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();
            let formFlag = false;
            if (!formFlag) {
                form.classList.add("was-validated");
            }
            if (form.checkValidity()) {
                nombre = document.getElementById("nombre").value;
                nombre2 = document.getElementById("2nombre").value;
                apellido = document.getElementById("apellido").value;
                apellido2 = document.getElementById("2apellido").value;
                email = document.getElementById("email").value;
                numero = document.getElementById("numero").value;
                guardarDatos()
                form.classList.remove("was-validated");
                window.location = "my-profile.html";
            }
        });
    }
});
