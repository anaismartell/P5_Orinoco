/// récupération de l'id produit dans l'url grace à méthode URLSearchParams
let urlSearchParams = new URLSearchParams(document.location.search)
let id = urlSearchParams.get("id")

//  affichage d'un produit dans la page
let request = new XMLHttpRequest() //crée un nouvel objet de type  XMLHttpRequest  qui correspond à notre objet AJAX
request.onreadystatechange = function () { // gestionnaire d'événement si l'attribut readyState change
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // si la réponse est prête et le statut est OK
        teddies = JSON.parse(this.responseText) // renvoie la réponse sous la forme d'un string
        affichageProduit() // appel de la fonction
    }  
};
request.open("GET", "http://localhost:3000/api/teddies/" + id) // initialisation de la requête
request.send() // envoi de la requête

// création de la fonction d'affichage du produit
function affichageProduit() {

    let titre = document.getElementById("titre")
    titre.textContent = teddies.name
    let prix = document.getElementById("prix")
    prix.textContent = teddies.price/100 + " €"
    let description = document.getElementById("description")
    description.textContent = teddies.description
    let image = document.getElementById("image")
    image.src = teddies.imageUrl

    //Création des couleurs
    let couleurs = document.getElementById("color-select")
    let options = teddies.colors
    options.forEach(function(element, couleur) {
        couleurs[couleur] = new Option(element, element)
    })

    //bouton retour à la liste       
    let retour_liste = document.getElementById("btn-liste")
    retour_liste.textContent = "Retour à la liste"
    retour_liste.addEventListener("click", function() {
        window.location.href = "index.html"
    })

    // bouton voir le panier
    let voir_panier = document.getElementById("btn-panier")
    voir_panier.textContent = "Voir le panier"
    voir_panier.addEventListener("click", function() {
        window.location.href = "panier.html"
    })

    //sélection de la couleur
    let selectionCouleur = document.getElementById("color-select").addEventListener("change", function (e) {
        selectionCouleur = e.target.value;
    });

    // sélection de la quantité
    let quantiteProduit = document.getElementById("quantiteProduit").addEventListener('change', function (e) {
        quantiteProduit = e.target.value
    })

    // Pop up confirmation d'ajout au panier
    let overlay = document.getElementById('overlay')
    function openMoadl() {
    overlay.style.display='block';
    }
    let btnClose = document.getElementById('btnClose')
    btnClose.addEventListener('click',closeModal)
    function closeModal() {
    overlay.style.display='none';
    window.location.href = "index.html"
    }  

    //bouton ajouter au panier
    let ajouter_panier = document.getElementById("btn-ajouter")
        ajouter_panier.textContent = "Ajouter au panier"
        ajouter_panier.addEventListener("click", function() {
            if(selectionCouleur != undefined && quantiteProduit != undefined){
                teddies.colors = selectionCouleur
                teddies.quantity = quantiteProduit
                prixTotal()
                ajoutSessionStorage()
                openMoadl()
            } else if (selectionCouleur == undefined && quantiteProduit != undefined) {
                teddies.colors = teddies.colors[0]
                teddies.quantity = quantiteProduit
                prixTotal()
                ajoutSessionStorage()
                openMoadl()
            } else if (selectionCouleur != undefined && quantiteProduit == undefined) {
                teddies.colors = selectionCouleur
                teddies.quantity = 1
                prixTotal()
                ajoutSessionStorage()
                openMoadl()
            } else {
                teddies.colors = teddies.colors[0]
                teddies.quantity = 1
                prixTotal()
                ajoutSessionStorage()
                openMoadl()
                }
        })
}

//enregistrement du prix total dans sessionstorage pour le proposer dans la page panier et commande
function prixTotal(){
    let price = parseInt(teddies.price);
    let prixDuPanier = JSON.parse(sessionStorage.getItem('prixTotal'));
    
    if(prixDuPanier != null){
        sessionStorage.setItem("prixTotal", prixDuPanier + (price/100 * teddies.quantity));
    } else {
        sessionStorage.setItem("prixTotal", price/100 * teddies.quantity);
    }
}

// création de la fonction ajout dans sessionstorage
function ajoutSessionStorage(){
    let panier = sessionStorage.getItem('panier');
    panier = JSON.parse(panier);

    let name = teddies.name + teddies.colors;
    if(panier != null){
        let element = panier[name]
        if(element === undefined) {
            panier = {...panier,  [name] : teddies}
        } else {
            let quantity = parseInt(element.quantity);
            quantity += parseInt(teddies.quantity);
            element.quantity = quantity;
        }
    } else {
        panier = {[name] : teddies}

    }
    sessionStorage.setItem("panier", JSON.stringify(panier));
}
