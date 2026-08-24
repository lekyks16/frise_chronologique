// ===================
// Boutton Sauvegarder
// ===================

 let modalSauvegarder = document.getElementById("modalSauvegarder");
 let sauvegarder = document.getElementById("sauvegarder");
 let annulerSauvegarder = document.getElementById("annulerSauvegarder");
 let confirmerSauvegarder = document.getElementById("confirmerSauvegarder");

 sauvegarder.addEventListener("click", function () {
    modalSauvegarder.style.display = "flex";
});

 annulerSauvegarder.addEventListener("click", function () {
    modalSauvegarder.style.display = "none";
});

 confirmerSauvegarder.addEventListener("click", function () {
    modalSauvegarder.style.display = "none";
});


// ===================
// Boutton Nouvel élément
// ===================

// Transforme une date en un nombre de jours (approximation)
function convertirEnJours(jour, mois, annee) {
    return annee * 365 + (mois - 1) * 30 + (jour - 1);
}


// ===================
// Paramètres de la frise
// ===================

// Début visible de la frise
 let debutVisibleFrise = convertirEnJours(1, 1, -500);

// Zoom (pixels par jour)
 let coefficient = 0.2;


// ===================
// Gestion des lignes
// ===================

 let lignes = [];


 let modalNouvelElement = document.getElementById("modalNouvelElement");
 let nouvelElement = document.getElementById("nouvelElement");
 let annulerNouvelElement = document.getElementById("annulerNouvelElement");
 let creerNouvelElement = document.getElementById("creerNouvelElement");


// Ouvrir la fenêtre
 nouvelElement.addEventListener("click", function () {
    modalNouvelElement.style.display = "flex";
});


// Fermer sans créer
 annulerNouvelElement.addEventListener("click", function () {
    modalNouvelElement.style.display = "none";
});


// Créer un évènement
 creerNouvelElement.addEventListener("click", function () {

     let titre = document.getElementById("titre").value;

     let jourDebut = parseInt(document.getElementById("jourDebut").value);
     let moisDebut = parseInt(document.getElementById("moisDebut").value);
     let anneeDebut = parseInt(document.getElementById("anneeDebut").value);

     let jourFin = parseInt(document.getElementById("jourFin").value);
     let moisFin = parseInt(document.getElementById("moisFin").value);
     let anneeFin = parseInt(document.getElementById("anneeFin").value);

     let couleur = document.getElementById("couleur").value;

    // Conversion des dates en jours
     let debut = convertirEnJours(jourDebut, moisDebut, anneeDebut);
     let fin = convertirEnJours(jourFin, moisFin, anneeFin);

     let timelineEvents = document.querySelector(".timelineEvents");

    // Position verticale automatique
     let ligne = 0;

    // Cherche une ligne disponible
    while (true) {

        // Si la ligne n'existe pas encore
        if (!lignes[ligne]) {
            lignes[ligne] = [];
            break;
        }

        // Vérifie si l'évènement chevauche un autre
        let collision = false;

        for (let evenementLigne of lignes[ligne]) {

            if (!(fin <= evenementLigne.debut || debut >= evenementLigne.fin)) {
                collision = true;
                break;
            }

        }

        if (!collision) {
            break;
        }

        ligne++;
    }

    // Création de l'évènement
     let evenement = document.createElement("div");
     evenement.classList.add("evenement");
     evenement.style.top = (ligne * 90) + "px";
     evenement.style.backgroundColor = couleur;

    // Traits
     let traitDebut = document.createElement("div");
     traitDebut.classList.add("traitDebut");

     let traitFin = document.createElement("div");
     traitFin.classList.add("traitFin");

    // ===================
    // Position horizontale
    // ===================

     let position = (debut - debutVisibleFrise) * coefficient;
     evenement.style.left = position + "px";

    // ===================
    // Largeur
    // ===================

     let largeurEvenement = (fin - debut) * coefficient;

    // Largeur minimale
     largeurEvenement = Math.max(largeurEvenement, 80);

     evenement.style.width = largeurEvenement + "px";

    // ===================
    // Contenu
    // ===================

     let titreElement = document.createElement("div");
     titreElement.textContent = titre;

     let dateElement = document.createElement("div");
     dateElement.textContent =
        jourDebut + "/" + moisDebut + "/" + anneeDebut +
        " → " +
        jourFin + "/" + moisFin + "/" + anneeFin;

     evenement.appendChild(titreElement);
     evenement.appendChild(dateElement);

    // Ajout des traits
     evenement.appendChild(traitDebut);
     evenement.appendChild(traitFin);

    // Taille des traits
     let hauteurTrait = 40;

     traitDebut.style.height = hauteurTrait + "px";
     traitFin.style.height = hauteurTrait + "px";

    // Ajout dans la frise
     lignes[ligne].push({
        debut: debut,
        fin: fin,
        element: evenement
    });

     timelineEvents.appendChild(evenement);

    // Fermeture de la fenêtre
     modalNouvelElement.style.display = "none";

});


// ===================
// Boutton Annuler
// ===================



// ===================
// Boutton Refaire
// ===================