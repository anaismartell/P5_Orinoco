
let container = document.getElementById("teddies_list") // Création d'une variable container qui correspond à la div teddies_list du fichier HTML
let url = "http://localhost:3000/api/teddies" 

// Récupération des données de l'API grâce à fetch
fetch(url)
    .then(response => response.json()) // Retourner la réponse au format js
    .then(json =>{
        // Création de la boucle pour récupérer chaque élément
        json.forEach(({_id, name, description, price, imageUrl}) =>{
            // Etape 1: Création des nouveauxx éléments à l'aide de createElementou createTextNode
            let div = document.createElement("div") 
            let img = document.createElement("img") 
            let h3 = document.createElement("h3") 
            let h4 = document.createElement("h4") 
            let p = document.createElement("p") 
            let link = document.createElement("a") 
            let apiName = document.createTextNode (name) // Création d'une variable qui stockera le nom de l'ourson ce dernier correspondant à la donnée "name" de l'API
            let apiPrice = document.createTextNode (price/100+ " €") // Création d'une variable qui stockera le prix de l'ourson ce dernier correspondant à la donnée "price" de l'API
            let apiDescription = document.createTextNode (description) // Création d'une variable qui stockera la description de l'ourson cette dernière correspondant à la donnée "description" de l'API

            // Etape 2: Définition des informations des éléments
            link.href = 'product.html?id=' + _id; 
            link.textContent = "Voir le produit"
            img.src = imageUrl

            // Etape 3: Insertion des nouveaux éléments dans le DOM
            container.appendChild (div) 
            div.appendChild (img) 
            div.appendChild (h3) 
            div.appendChild (h4) /
            div.appendChild (p) 
            div.appendChild (link) 
            h3.appendChild(apiName) // Le h3 ajouté doit correspondre au nom de l'ourson 
            h4.appendChild(apiPrice) // Le h4 ajouté doit correspondre au prix de l'ourson
            p.appendChild(apiDescription) // Le paragraphe ajouté doit correspondre à la description de l'ourson

            // Etape 4: Application des styles boostrap sur les différents éléments
            container.className="d-flex flex-wrap justify-content-center lg-flex-row sm-flex-column mx-auto"
            div.className ="card m-5 border-dark col-10 offset-1 col-md-4 col-lg-3 bg-dark text-white"
            img.className ="card-img-top my-3"
            link.className = "btn btn-info offset-6 m-3"
        })
    })
    .catch(function (error) {
        console.log(error);
});