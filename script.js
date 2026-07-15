let modal = document.getElementById("modal");
let sauvegarder = document.getElementById("sauvegarder");
let annulerModal = document.getElementById("annulerModal");
let confirmer = document.getElementById("confirmer");

sauvegarder.addEventListener("click", function() {
    modal.style.display = "flex";
});
annulerModal.addEventListener("click", function() {
    modal.style.display = "none";
});
confirmer.addEventListener("click", function() {
    modal.style.display = "none";
});