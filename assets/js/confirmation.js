//variables pour l'affichage des données
let totalPriceDisplay = document.querySelector(".totalPrice span");
let orderIdDisplay = document.querySelector(".orderId span");
let orderInfo = localStorage.getItem("orderInfos");
orderInfo = JSON.parse(localStorage.orderInfos);
let prixTotal = JSON.parse(sessionStorage.getItem("prixTotal"))
let orderId = orderInfo.orderId;

//affichage des données
totalPriceDisplay.textContent = prixTotal; //affichage du prix total
orderIdDisplay.textContent = orderId; //affichage de l'id de commande

//récapitulatif de la commande
let recapDisplay = document.querySelector(".recap p");
let nameDisplay = document.querySelector(".name");
let recapOrder = localStorage.getItem("panier");
let nameGet = localStorage.getItem("orderInfos");
recapOrder = JSON.parse(recapOrder);
nameGet = JSON.parse(nameGet);
nameDisplay.textContent = `${nameGet.contact.firstName} ${nameGet.contact.lastName}`;


//reset le panier au départ de la page
window.addEventListener("unload", function () {
  localStorage.clear();
});