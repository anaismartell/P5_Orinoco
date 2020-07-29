
let container = document.getElementById("teddies_list") // Création d'une variable container qui corresponde à la div teddies_list du fichier HTML
let url = "http://localhost:3000/api/teddies"

// Récupération des données de l'API grâce à fetch
fetch(url)
    .then(response => response.json())
    .then(json =>{
        // Création de la boucle pour récupérer chaque élément
        json.forEach(({_id, name, description, price, imageUrl}) =>{
            let div = document.createElement("div") // Création d'une div comprenant les infos pour chaque ourson
            let img = document.createElement("img") // Création d'une image 
            let h3 = document.createElement("h3") // Création d'un titre
            let h4 = document.createElement("h4") // Création d'un sous-titre
            let p = document.createElement("p") // Création d'un paragraphe
            let link = document.createElement("a") // Création d'un lien 

            let apiName = document.createTextNode (name) // Création d'une variable qui stockera le nom de l'ourson ce dernier correspondant à la donnée "name" de l'API
            let apiPrice = document.createTextNode (price/100+ " €") // Création d'une variable qui stockera le prix de l'ourson ce dernier correspondant à la donnée "price" de l'API
            let apiDescription = document.createTextNode (description) // Création d'une variable qui stockera la description de l'ourson cette dernière correspondant à la donnée "description" de l'API
            link.href = 'pages/product.html?id=' + _id;
            link.textContent = "Voir le produit"
            img.src = imageUrl

            container.appendChild (div) // Ajout de la div à container
            div.appendChild (img) // Ajout de l'image dans la div
            div.appendChild (h3) // Ajout du h3 dans la div
            div.appendChild (h4) // Ajout du h4 dans la div
            div.appendChild (p) // Ajout du paragraphe de description dans la div
            div.appendChild (link) // Ajout du lien dans la div
            h3.appendChild(apiName) // Le h3 doit correspondre au nom de l'ourson 
            h4.appendChild(apiPrice) // Le h4 doit correspondre au prix de l'ourson
            p.appendChild(apiDescription) // Le paragraphe doit correspondre à la description de l'ourson


            // Application des styles boostrap sur les éléments
            container.className="d-flex flex-wrap justify-content-center lg-flex-row sm-flex-column mx-auto"
            div.className ="card m-5 border-dark col-10 offset-1 col-md-4 col-lg-3"
            p.className =""
            img.className ="card-img-top"
            link.className = "btn btn-primary offset-6 m-3"
        })
    })
    .catch(function (error) {
        console.log(error);
});