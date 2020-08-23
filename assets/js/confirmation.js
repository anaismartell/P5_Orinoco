//création des variables pour l'affichage des données
let affichagePrixTotal = document.querySelector(".totalPrice span");
let affichageID = document.querySelector(".commandeID span");
let orderInfo = localStorage.getItem("orderInfos");
orderInfo = JSON.parse(localStorage.orderInfos);
let prixTotal = JSON.parse(sessionStorage.getItem("prixTotal"))
let orderId = orderInfo.orderId;
let affichageNom= document.querySelector(".name");
let nameGet = localStorage.getItem("orderInfos");
nameGet = JSON.parse(nameGet);

//affichage des données
affichagePrixTotal.textContent = prixTotal; //affichage du prix total
affichageID.textContent = orderId; //affichage de l'id de commande
affichageNom.textContent = `${nameGet.contact.firstName} ${nameGet.contact.lastName}`; //affichage du nom de la personne

//reset le panier au départ de la page
window.addEventListener("unload", function () {
  localStorage.clear();
  sessionStorage.clear();
});