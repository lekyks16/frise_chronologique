// ===================
// Boutton Sauvegarder
// ===================

let modalSauvegarder = document.getElementById("modalSauvegarder");
let sauvegarder = document.getElementById("sauvegarder");
let annulerSauvegarder = document.getElementById("annulerSauvegarder");
let confirmerSauvegarder = document.getElementById("confirmerSauvegarder");

sauvegarder.addEventListener("click", function() {
    modalSauvegarder.style.display = "flex";
});
annulerSauvegarder.addEventListener("click", function() {
    modalSauvegarder.style.display = "none";
});
confirmerSauvegarder.addEventListener("click", function() {
    modalSauvegarder.style.display = "none";
});


// ===================
// Boutton Nouvel élément
// ===================

let modalNouvelElement = document.getElementById("modalNouvelElement");
let nouvelElement = document.getElementById("nouvelElement");
let annulerNouvelElement = document.getElementById("annulerNouvelElement");
let creerNouvelElement = document.getElementById("creerNouvelElement");
nouvelElement.addEventListener("click", function() {
    modalNouvelElement.style.display = "flex";
});
annulerNouvelElement.addEventListener("click", function() {
    modalNouvelElement.style.display = "none";
});
creerNouvelElement.addEventListener("click", function() {
    modalNouvelElement.style.display = "none";
});

creerNouvelElement.addEventListener("click", function() {
    let titre = document.getElementById("titre").value;
    let dateDebut = document.getElementById("dateDebut").value;
    let dateFin = document.getElementById("dateFin").value;
    let couleur = document.getElementById("couleur").value;
    
    let timelineEvents = document.querySelector(".timelineEvents");
    let evenement = document.createElement("div");
    evenement.classList.add("evenement");
    evenement.textContent = titre;
    timelineEvents.appendChild(evenement);
    modalNouvelElement.style.display = "none";
    evenement.style.backgroundColor = couleur;
});


// ===================
// Boutton Annuler
// ===================



// ===================
// Bouton Refaire
// ===================
