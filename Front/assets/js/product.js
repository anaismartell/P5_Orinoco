// Méthode pour récupérer l'ID dans l'URL
let urlSearchParams = new URLSearchParams(document.location.search)
let id = urlSearchParams.get("id") // Retourne la valeur de l'id
console.log("Il a selectionné " +id)

// Fonction et condition pour afficher un seul produit dans la page
let request = new XMLHttpRequest()
request.onreadystatechange = function() { // gestionnaire d'événement si l'attribut readyStatechange
    if (this.readyState == 4 && this.status == 200) { // si la réponse est prêt est le statut est OK
        teddies = JSON.parse(this.responseText) // 
        affichageProduit()
    } else {
        alert ="Le seveur ne répond pas"
    }
};
request.open("GET", "http://localhost:3000/api/teddies/" + id) // Initialise la requête
request.send() // Envoi la requête

// Fonction affichage du produit
function affichageProduit() {

    console.log("Le nom du produit est " + teddies.name)

    let titre = document.getElementById("titre")
    titre.textContent = teddies.name
    let prix = document.getElementById("prix")
    prix.textContent = teddies.price/100 + " €" 
    let description = document.getElementById("description")
    description.textContent = teddies.description
    let image = document.getElementById("image")
    image.src = teddies.imageUrl

    //Création des couleurs
    let couleurs= document.getElementById("color-select")
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

    //selection de la couleur
    let selectionCouleur = document.getElementById("color-select").addEventListener("change", function (e) {
        selectionCouleur = e.target.value;
        console.log("Il sélectionne la couleur : " + e.target.value);
    });

    // selection du nombre de produit
    let quantiteProduit = document.getElementById("quantiteProduit").addEventListener('change', function (e) {
        quantiteProduit = e.target.value
        console.log("Il en veut :" + e.target.value)
    })

    let overlay = document.getElementById('overlay')
    function openMoadl() {
    overlay.style.display='block';
    }

    let btnClose = document.getElementById('btnClose')
    btnClose.addEventListener('click',closeModal)
    function closeModal() {
    overlay.style.display='none';
    }   


    //bouton ajouter au panier
    let boutonPanier = document.getElementById("btn-ajouter")
        boutonPanier.textContent = "Ajouter au panier"
        boutonPanier.addEventListener("click", function() {
                console.log("Il ajoute "+ quantiteProduit + " " + teddies.name + selectionCouleur + " au panier.")
                teddies.colors = selectionCouleur
                teddies.quantity = quantiteProduit
                prixTotal()
                ajoutSessionStorage()
                openMoadl()
        })
}

// fonction calculant le prix total
function prixTotal(){
    let price = parseInt(teddies.price/100);
    let prixDuPanier= JSON.stringify(sessionStorage.getItem('prixTotal'));
    
    if(prixDuPanier != null){
        sessionStorage.setItem("prixTotal", prixDuPanier + (price* teddies.quantity));
    } else {
        sessionStorage.setItem("prixTotal", price * teddies.quantity);
    }
  
  }
  
  // fonction sauvegardant la panier et le total pour affichage dans la page panier et commande
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
  
 