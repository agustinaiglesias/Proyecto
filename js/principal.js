document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    
    document.getElementById("inicio").addEventListener("click", function() {
        window.location = "index.html"
    }); 
    document.getElementById("vender").addEventListener("click", function() {
        window.location = "sell.html"
    });
    document.getElementById("categorias").addEventListener("click", function() {
        window.location = "categories.html"
    });
});

