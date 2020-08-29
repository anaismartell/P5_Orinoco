// Fonction affichage produit au panier
function affichagePanier() {
  //je récupére mon produit dans local storage "panier"
  let panier = JSON.parse(localStorage.getItem("panier"))
  let prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
  let prixPanier = document.getElementById('affichageTotal')
  prixPanier.className = "text-center bg-info my-0 py-1"

  let tableauPanier = document.getElementById("afficheProduitPanier")
  
  // affichage du prix total du panier si le panier:
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
  if (panier == null) {
      let div = document.createElement("div")
      div.textContent = "Le panier est vide!"
      afficheProduitPanier.appendChild(div)
      console.log("Le panier est vide!!!!")
  } else {
      //s'il y a qq chose, créé un tableau contenant chaque produit
      tableauPanier.innerHTML = ''
      Object.values(panier).map((teddies) => {
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
affichagePanier() // appel de la fonction





//création des variables d'informations client
let orderButton = document.querySelector(".order-submit");
let validationButton = document.querySelector(".validation");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let eMail = document.querySelector("#inputEmail");
let telephoneNumber = document.querySelector("#telephoneNumber");
let address = document.querySelector("#inputAddress");
let city = document.querySelector("#inputCity");
let zip = document.querySelector("#inputZip");


// création de l'objet général client
function Client (firstName, lastName, eMail, telephoneNumber, address, city, zip){
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.eMail = eMail),
      (this.telephoneNumber = telephoneNumber),
      (this.address = address),
      (this.city = city),
      (this.zip = zip);
  }

//création d'un tableau avec les articles commandés
let panier = JSON.parse(localStorage.getItem("panier"))
let listIdProduct = [];
for (let i = 0; i < panier.length; i++) {
  listIdProduct.push(panier[i].iD);
}
localStorage.setItem("products", JSON.stringify(listIdProduct ));
listIdProduct  = localStorage.getItem("products");
listIdProduct  = JSON.parse(listIdProduct );


// création du gestionnaire d'événement en cas de clic sur le bouton submit
if (panier == null){
  alert("Votre panier est vide vous ne pouvez pas passer commande.")
} else {
orderButton.classList.remove("disabled");
}

// fonction qui permet de valider chaque input
function validationInput (){
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
  if (firstName.value.length === 0){
    alert("Merci de renseigner votre prénom.")
  } else if (lastName.value.length === 0){
    alert("Merci de renseigner votre nom")
  } else if (eMail.value.length === 0 || !regexEmail.test(eMail.value)) {
      alert("Merci de renseigner votre adresse mail valide")
      eMail.style.borderColor = "red"
  } else if (address.value.length === 0){
    alert("Merci de renseigner une adresse.")
  } else if (telephoneNumber.value.length === 0){
    alert("Merci de renseigner un numéro valide.")
  } else if (city.value.length === 0){
    alert("Merci de renseigner votre ville.")
  } else if (zip.value.length === 0){
    alert("Merci de renseigner un code postal valide.")
  } else {
    alert("Vos informations ont bien été enregistrées. Vous pouvez à présent valider votre commande.");
    validationButton.classList.remove("disabled");
    send () // si tout est ok on créé un nouveau client et on envoie au serveur
  }
}

// Gestionnaire événément en cas de clic sur confirmer
  orderButton.addEventListener("click", function (event) {
  event.preventDefault();
  validationInput() // appel de la fonction on vérfie les inputs
  });

  //création fonction send 
  function send() {
    // Création nouveau client
    let newClient = new Client(
      firstName.value,
      lastName.value,
      eMail.value,
      telephoneNumber.value,
      address.value,
      city.value,
      zip.value
    );
  // POST API
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: {
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        address: newClient.address,
        city: newClient.city,
        email: newClient.eMail,
      },
      products: listIdProduct,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } 
  })
  .then((data) => {
    localStorage.setItem("orderInfos", JSON.stringify(data));
  })
  .catch((error) => console.log("erreur de type : ", error));
  }