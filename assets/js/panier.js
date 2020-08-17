
//Pour afficher mon produit
function affichagePanier() {
  //je récupére mon produit dans session storage "panier"
  let panier = JSON.parse(sessionStorage.getItem("panier"))
  let prixTotal = JSON.parse(sessionStorage.getItem("prixTotal"))
  let prixPanier = document.getElementById('affichageTotal')

  let tableauPanier = document.getElementById("afficheProduitPanier")
  
  // affichage du prix total du panier si le panier
  if (prixTotal != null) {
      prixPanier.textContent = 'Le montant de votre commande est de : ' + prixTotal +  ' €';
      prixPanier.id = 'prixTotal'; 
      let div = document.createElement("div")
      div.textContent = "Le panier est vide!"
      afficheProduitPanier.appendChild(div)
  } else  {
      prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
  }

  // si il n'y a rien dans le panier, affiche "Le panier est vide!"
  if ( panier == null) {
      let div = document.createElement("div")
      div.textContent = "Le panier est vide!"
      afficheProduitPanier.appendChild(div)
      console.log("Le panier est vide!!!!")
  } else {
      //s'il y a qq chose, creer un tableau avec chaque article
      tableauPanier.innerHTML = ''
      Object.values(panier).map( (teddies) => {
          let tr = document.createElement("tr")
          afficheProduitPanier.appendChild(tr)
          
              let name = document.createElement("td")
              name.textContent = teddies.name
              tr.appendChild(name)

              let couleur = document.createElement("td")
              couleur.textContent = teddies.colors
              tr.appendChild(couleur)

              let description = document.createElement("td")
              description.textContent = teddies.description
              tr.appendChild(description)

              let quantite = document.createElement("td")
              quantite.textContent = teddies.quantity
              tr.appendChild(quantite)

              let prix = document.createElement("td")
              prix.textContent = teddies.price/100  + "€"
              tr.appendChild(prix)

            console.log("Voici le panier :")
            console.log(panier)
      })
  }
}
affichagePanier()  



