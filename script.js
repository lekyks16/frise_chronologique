// Boutton Sauvegarder
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


// Boutton Nouvel élément
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


// Boutton Annuler



// Bouton Refaire