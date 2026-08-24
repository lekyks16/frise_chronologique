// ============================================================
// FRIZE CHRONOLOGIQUE — VERSION 1.0.2
// ============================================================


// ============================================================
// ÉLÉMENTS HTML
// ============================================================

const workspace = document.getElementById("workspace");
const timeline = document.querySelector(".timeline");
const timelineEvents = document.querySelector(".timelineEvents");


// ============================================================
// SAUVEGARDE
// ============================================================

const sauvegarder = document.getElementById("sauvegarder");
const modalSauvegarder = document.getElementById("modalSauvegarder");
const confirmerSauvegarder = document.getElementById("confirmerSauvegarder");
const annulerSauvegarder = document.getElementById("annulerSauvegarder");


// ============================================================
// NOUVEL ÉLÉMENT
// ============================================================

const nouvelElement = document.getElementById("nouvelElement");
const modalNouvelElement = document.getElementById("modalNouvelElement");
const creerNouvelElement = document.getElementById("creerNouvelElement");
const annulerNouvelElement = document.getElementById("annulerNouvelElement");


// ============================================================
// MODIFICATION
// ============================================================

const modalModifierEvenement =
    document.getElementById("modalModifierEvenement");

const confirmerModification =
    document.getElementById("confirmerModification");

const supprimerEvenement =
    document.getElementById("supprimerEvenement");

const annulerModification =
    document.getElementById("annulerModification");


// ============================================================
// HISTORIQUE
// ============================================================

const boutonAnnuler = document.getElementById("annuler");
const boutonRefaire = document.getElementById("refaire");

let historique = [];
let historiqueRefait = [];


// ============================================================
// ÉVÉNEMENT SÉLECTIONNÉ
// ============================================================

let evenementSelectionne = null;


// ============================================================
// PARAMÈTRES DE LA FRISE
// ============================================================

// Date située au début de la frise
const debutVisibleFrise = convertirEnJours(1, 1, -500);

// Niveau de zoom
let coefficient = 0.2;

// Déplacement de la frise
let offsetX = 0;
let offsetY = 0;


// ============================================================
// LIGNES DE LA FRISE
// ============================================================

let lignes = [];


// ============================================================
// CONVERSION DES DATES
// ============================================================

// Approximation :
// 1 année = 365 jours
// 1 mois = 30 jours

function convertirEnJours(jour, mois, annee) {

    return (
        annee * 365 +
        (mois - 1) * 30 +
        (jour - 1)
    );
}


// ============================================================
// MISE À JOUR DE LA FRISE
// ============================================================

function mettreAJourFrise() {

    timeline.style.transform =
        `translate(${offsetX}px, ${offsetY}px) scale(${coefficient})`;
}


// ============================================================
// ZOOM
// ============================================================

// Création des boutons si nécessaire
let zoomPlus = document.getElementById("zoomPlus");
let zoomMoins = document.getElementById("zoomMoins");


// Si les boutons existent dans le HTML
if (zoomPlus) {

    zoomPlus.addEventListener("click", function (event) {

        event.stopPropagation();

        coefficient += 0.1;

        if (coefficient > 3) {
            coefficient = 3;
        }

        mettreAJourFrise();

    });
}


if (zoomMoins) {

    zoomMoins.addEventListener("click", function (event) {

        event.stopPropagation();

        coefficient -= 0.1;

        if (coefficient < 0.1) {
            coefficient = 0.1;
        }

        mettreAJourFrise();

    });
}


// ============================================================
// SAUVEGARDE
// ============================================================

sauvegarder.addEventListener("click", function () {

    modalSauvegarder.style.display = "flex";

});


annulerSauvegarder.addEventListener("click", function () {

    modalSauvegarder.style.display = "none";

});


confirmerSauvegarder.addEventListener("click", function () {

    sauvegarderFrise();

    modalSauvegarder.style.display = "none";

    alert("La frise a été sauvegardée !");

});


// ============================================================
// SAUVEGARDER LA FRISE
// ============================================================

function sauvegarderFrise() {

    let donnees = [];

    document.querySelectorAll(".evenement").forEach(function (evenement) {

        donnees.push({

            titre: evenement.donnees.titre,

            jourDebut: evenement.donnees.jourDebut,
            moisDebut: evenement.donnees.moisDebut,
            anneeDebut: evenement.donnees.anneeDebut,

            jourFin: evenement.donnees.jourFin,
            moisFin: evenement.donnees.moisFin,
            anneeFin: evenement.donnees.anneeFin,

            couleur: evenement.donnees.couleur,

            ligne: evenement.donnees.ligne

        });

    });


    localStorage.setItem(
        "friseChronologique",
        JSON.stringify(donnees)
    );

}


// ============================================================
// OUVRIR "NOUVEL ÉLÉMENT"
// ============================================================

nouvelElement.addEventListener("click", function () {

    modalNouvelElement.style.display = "flex";

});


annulerNouvelElement.addEventListener("click", function () {

    modalNouvelElement.style.display = "none";

});


// ============================================================
// CRÉER UN ÉVÉNEMENT
// ============================================================

creerNouvelElement.addEventListener("click", function () {


    // --------------------------------------------------------
    // Récupération des valeurs
    // --------------------------------------------------------

    let titre =
        document.getElementById("titre").value.trim();


    let jourDebut =
        parseInt(document.getElementById("jourDebut").value);


    let moisDebut =
        parseInt(document.getElementById("moisDebut").value);


    let anneeDebut =
        parseInt(document.getElementById("anneeDebut").value);


    let jourFin =
        parseInt(document.getElementById("jourFin").value);


    let moisFin =
        parseInt(document.getElementById("moisFin").value);


    let anneeFin =
        parseInt(document.getElementById("anneeFin").value);


    let couleur =
        document.getElementById("couleur").value;


    // --------------------------------------------------------
    // Vérification
    // --------------------------------------------------------

    if (
        !titre ||
        isNaN(jourDebut) ||
        isNaN(moisDebut) ||
        isNaN(anneeDebut) ||
        isNaN(jourFin) ||
        isNaN(moisFin) ||
        isNaN(anneeFin)
    ) {

        alert("Merci de remplir tous les champs.");

        return;

    }


    // --------------------------------------------------------
    // Conversion des dates
    // --------------------------------------------------------

    let debut =
        convertirEnJours(
            jourDebut,
            moisDebut,
            anneeDebut
        );


    let fin =
        convertirEnJours(
            jourFin,
            moisFin,
            anneeFin
        );


    if (fin < debut) {

        alert(
            "La date de fin doit être après la date de début."
        );

        return;

    }


    // --------------------------------------------------------
    // Recherche d'une ligne disponible
    // --------------------------------------------------------

    let ligne = trouverLigneDisponible(
        debut,
        fin
    );


    // --------------------------------------------------------
    // Création de la ligne si nécessaire
    // --------------------------------------------------------

    if (!lignes[ligne]) {

        lignes[ligne] = [];

    }


    // --------------------------------------------------------
    // Création de l'événement
    // --------------------------------------------------------

    let evenement =
        document.createElement("div");


    evenement.classList.add("evenement");


    evenement.style.top =
        (ligne * 100 + 20) + "px";


    evenement.style.backgroundColor =
        couleur;


    // --------------------------------------------------------
    // Position horizontale
    // --------------------------------------------------------

    let position =
        (debut - debutVisibleFrise);


    evenement.style.left =
        position + "px";


    // --------------------------------------------------------
    // Largeur
    // --------------------------------------------------------

    let largeur =
        (fin - debut);


    largeur =
        Math.max(largeur, 120);


    evenement.style.width =
        largeur + "px";


    // --------------------------------------------------------
    // Titre
    // --------------------------------------------------------

    let titreElement =
        document.createElement("div");


    titreElement.classList.add("titreEvenement");


    titreElement.textContent =
        titre;


    // --------------------------------------------------------
    // Dates
    // --------------------------------------------------------

    let dateElement =
        document.createElement("div");


    dateElement.classList.add("dateEvenement");


    dateElement.textContent =
        formaterDate(
            jourDebut,
            moisDebut,
            anneeDebut
        )
        +
        " → "
        +
        formaterDate(
            jourFin,
            moisFin,
            anneeFin
        );


    // --------------------------------------------------------
    // Trait de début
    // --------------------------------------------------------

    let traitDebut =
        document.createElement("div");


    traitDebut.classList.add(
        "traitDebut"
    );


    // --------------------------------------------------------
    // Trait de fin
    // --------------------------------------------------------

    let traitFin =
        document.createElement("div");


    traitFin.classList.add(
        "traitFin"
    );


    // --------------------------------------------------------
    // Ajout dans l'événement
    // --------------------------------------------------------

    evenement.appendChild(
        titreElement
    );


    evenement.appendChild(
        dateElement
    );


    evenement.appendChild(
        traitDebut
    );


    evenement.appendChild(
        traitFin
    );


    // --------------------------------------------------------
    // Données
    // --------------------------------------------------------

    evenement.donnees = {

        titre: titre,

        jourDebut: jourDebut,
        moisDebut: moisDebut,
        anneeDebut: anneeDebut,

        jourFin: jourFin,
        moisFin: moisFin,
        anneeFin: anneeFin,

        couleur: couleur,

        debut: debut,
        fin: fin,

        ligne: ligne

    };


    // --------------------------------------------------------
    // Clic sur l'événement
    // --------------------------------------------------------

    evenement.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            selectionnerEvenement(
                evenement
            );

        }
    );


    // --------------------------------------------------------
    // Ajout dans la ligne
    // --------------------------------------------------------

    lignes[ligne].push({

        debut: debut,

        fin: fin,

        element: evenement

    });


    // --------------------------------------------------------
    // Ajout dans la page
    // --------------------------------------------------------

    timelineEvents.appendChild(
        evenement
    );


    // --------------------------------------------------------
    // Historique
    // --------------------------------------------------------

    historique.push({

        type: "creation",

        element: evenement,

        ligne: ligne,

        debut: debut,

        fin: fin

    });


    historiqueRefait = [];


    // --------------------------------------------------------
    // Fermeture
    // --------------------------------------------------------

    modalNouvelElement.style.display =
        "none";


    // --------------------------------------------------------
    // Nettoyage des champs
    // --------------------------------------------------------

    document.getElementById(
        "titre"
    ).value = "";


    // --------------------------------------------------------
    // Centrer la vue sur l'événement
    // --------------------------------------------------------

    centrerSurEvenement(
        evenement
    );

});


// ============================================================
// TROUVER UNE LIGNE DISPONIBLE
// ============================================================

function trouverLigneDisponible(
    debut,
    fin,
    ligneExclue = null
) {

    let ligne = 0;


    while (true) {

        if (!lignes[ligne]) {

            return ligne;

        }


        let collision = false;


        for (
            let element of lignes[ligne]
        ) {

            if (
                element.element === ligneExclue
            ) {

                continue;

            }


            if (
                !(fin <= element.debut ||
                  debut >= element.fin)
            ) {

                collision = true;

                break;

            }

        }


        if (!collision) {

            return ligne;

        }


        ligne++;

    }

}


// ============================================================
// FORMATER UNE DATE
// ============================================================

function formaterDate(
    jour,
    mois,
    annee
) {

    return (
        jour +
        "/" +
        mois +
        "/" +
        annee
    );

}


// ============================================================
// SÉLECTIONNER UN ÉVÉNEMENT
// ============================================================

function selectionnerEvenement(
    evenement
) {

    if (
        evenementSelectionne !== null
    ) {

        evenementSelectionne.classList.remove(
            "selectionne"
        );

    }


    evenementSelectionne =
        evenement;


    evenement.classList.add(
        "selectionne"
    );


    ouvrirModification(
        evenement
    );

}


// ============================================================
// OUVRIR MODIFICATION
// ============================================================

function ouvrirModification(
    evenement
) {

    let donnees =
        evenement.donnees;


    document.getElementById(
        "modifierTitre"
    ).value =
        donnees.titre;


    document.getElementById(
        "modifierJourDebut"
    ).value =
        donnees.jourDebut;


    document.getElementById(
        "modifierMoisDebut"
    ).value =
        donnees.moisDebut;


    document.getElementById(
        "modifierAnneeDebut"
    ).value =
        donnees.anneeDebut;


    document.getElementById(
        "modifierJourFin"
    ).value =
        donnees.jourFin;


    document.getElementById(
        "modifierMoisFin"
    ).value =
        donnees.moisFin;


    document.getElementById(
        "modifierAnneeFin"
    ).value =
        donnees.anneeFin;


    document.getElementById(
        "modifierCouleur"
    ).value =
        donnees.couleur;


    modalModifierEvenement.style.display =
        "flex";

}


// ============================================================
// FERMER MODIFICATION
// ============================================================

annulerModification.addEventListener(
    "click",
    function () {

        fermerModification();

    }
);


function fermerModification() {

    modalModifierEvenement.style.display =
        "none";


    if (
        evenementSelectionne !== null
    ) {

        evenementSelectionne.classList.remove(
            "selectionne"
        );

    }


    evenementSelectionne = null;

}


// ============================================================
// MODIFIER UN ÉVÉNEMENT
// ============================================================

confirmerModification.addEventListener(
    "click",
    function () {


        if (
            evenementSelectionne === null
        ) {

            return;

        }


        let evenement =
            evenementSelectionne;


        let anciennesDonnees = {
            ...evenement.donnees
        };


        // ----------------------------------------------------
        // Nouvelles valeurs
        // ----------------------------------------------------

        let titre =
            document.getElementById(
                "modifierTitre"
            ).value.trim();


        let jourDebut =
            parseInt(
                document.getElementById(
                    "modifierJourDebut"
                ).value
            );


        let moisDebut =
            parseInt(
                document.getElementById(
                    "modifierMoisDebut"
                ).value
            );


        let anneeDebut =
            parseInt(
                document.getElementById(
                    "modifierAnneeDebut"
                ).value
            );


        let jourFin =
            parseInt(
                document.getElementById(
                    "modifierJourFin"
                ).value
            );


        let moisFin =
            parseInt(
                document.getElementById(
                    "modifierMoisFin"
                ).value
            );


        let anneeFin =
            parseInt(
                document.getElementById(
                    "modifierAnneeFin"
                ).value
            );


        let couleur =
            document.getElementById(
                "modifierCouleur"
            ).value;


        // ----------------------------------------------------
        // Vérification
        // ----------------------------------------------------

        if (
            !titre ||
            isNaN(jourDebut) ||
            isNaN(moisDebut) ||
            isNaN(anneeDebut) ||
            isNaN(jourFin) ||
            isNaN(moisFin) ||
            isNaN(anneeFin)
        ) {

            alert(
                "Merci de remplir tous les champs."
            );

            return;

        }


        let debut =
            convertirEnJours(
                jourDebut,
                moisDebut,
                anneeDebut
            );


        let fin =
            convertirEnJours(
                jourFin,
                moisFin,
                anneeFin
            );


        if (fin < debut) {

            alert(
                "La date de fin doit être après la date de début."
            );

            return;

        }


        // ----------------------------------------------------
        // Ligne actuelle
        // ----------------------------------------------------

        let ancienneLigne =
            evenement.donnees.ligne;


        // Retirer temporairement de sa ligne

        lignes[ancienneLigne] =
            lignes[ancienneLigne].filter(
                function (element) {

                    return (
                        element.element !== evenement
                    );

                }
            );


        // Chercher une nouvelle ligne

        let nouvelleLigne =
            trouverLigneDisponible(
                debut,
                fin
            );


        if (!lignes[nouvelleLigne]) {

            lignes[nouvelleLigne] = [];

        }


        // ----------------------------------------------------
        // Mise à jour des données
        // ----------------------------------------------------

        evenement.donnees = {

            titre: titre,

            jourDebut: jourDebut,
            moisDebut: moisDebut,
            anneeDebut: anneeDebut,

            jourFin: jourFin,
            moisFin: moisFin,
            anneeFin: anneeFin,

            couleur: couleur,

            debut: debut,
            fin: fin,

            ligne: nouvelleLigne

        };


        // ----------------------------------------------------
        // Mise à jour visuelle
        // ----------------------------------------------------

        evenement.style.backgroundColor =
            couleur;


        evenement.style.top =
            (nouvelleLigne * 100 + 20) +
            "px";


        evenement.style.left =
            (
                debut -
                debutVisibleFrise
            ) +
            "px";


        evenement.style.width =
            Math.max(
                fin - debut,
                120
            ) + "px";


        // Titre

        evenement.querySelector(
            ".titreEvenement"
        ).textContent =
            titre;


        // Dates

        evenement.querySelector(
            ".dateEvenement"
        ).textContent =
            formaterDate(
                jourDebut,
                moisDebut,
                anneeDebut
            )
            +
            " → "
            +
            formaterDate(
                jourFin,
                moisFin,
                anneeFin
            );


        // ----------------------------------------------------
        // Ajouter à la nouvelle ligne
        // ----------------------------------------------------

        lignes[nouvelleLigne].push({

            debut: debut,

            fin: fin,

            element: evenement

        });


        // ----------------------------------------------------
        // Historique
        // ----------------------------------------------------

        historique.push({

            type: "modification",

            element: evenement,

            anciennesDonnees:
                anciennesDonnees,

            nouvellesDonnees:
                {
                    ...evenement.donnees
                }

        });


        historiqueRefait = [];


        fermerModification();

    }
);


// ============================================================
// SUPPRIMER UN ÉVÉNEMENT
// ============================================================

supprimerEvenement.addEventListener(
    "click",
    function () {


        if (
            evenementSelectionne === null
        ) {

            return;

        }


        let evenement =
            evenementSelectionne;


        let donnees =
            {
                ...evenement.donnees
            };


        // Retirer de la ligne

        lignes[donnees.ligne] =
            lignes[donnees.ligne].filter(
                function (element) {

                    return (
                        element.element !== evenement
                    );

                }
            );


        // Retirer de la page

        evenement.remove();


        // Historique

        historique.push({

            type: "suppression",

            element: evenement,

            donnees: donnees

        });


        historiqueRefait = [];


        fermerModification();

    }
);


// ============================================================
// ANNULER UNE ACTION
// ============================================================

boutonAnnuler.addEventListener(
    "click",
    function () {


        if (
            historique.length === 0
        ) {

            return;

        }


        let action =
            historique.pop();


        // ----------------------------------------------------
        // Annuler une création
        // ----------------------------------------------------

        if (
            action.type === "creation"
        ) {

            action.element.remove();


            lignes[action.ligne] =
                lignes[action.ligne].filter(
                    function (element) {

                        return (
                            element.element !==
                            action.element
                        );

                    }
                );

        }


        // ----------------------------------------------------
        // Annuler une suppression
        // ----------------------------------------------------

        else if (
            action.type === "suppression"
        ) {

            restaurerEvenement(
                action.element,
                action.donnees
            );

        }


        // ----------------------------------------------------
        // Annuler une modification
        // ----------------------------------------------------

        else if (
            action.type === "modification"
        ) {

            appliquerDonnees(
                action.element,
                action.anciennesDonnees
            );

        }


        historiqueRefait.push(
            action
        );

    }
);


// ============================================================
// REFAIRE UNE ACTION
// ============================================================

boutonRefaire.addEventListener(
    "click",
    function () {


        if (
            historiqueRefait.length === 0
        ) {

            return;

        }


        let action =
            historiqueRefait.pop();


        // ----------------------------------------------------
        // Refaire une création
        // ----------------------------------------------------

        if (
            action.type === "creation"
        ) {

            restaurerEvenement(
                action.element,
                action.element.donnees
            );

        }


        // ----------------------------------------------------
        // Refaire une suppression
        // ----------------------------------------------------

        else if (
            action.type === "suppression"
        ) {

            action.element.remove();


            lignes[action.donnees.ligne] =
                lignes[action.donnees.ligne].filter(
                    function (element) {

                        return (
                            element.element !==
                            action.element
                        );

                    }
                );

        }


        // ----------------------------------------------------
        // Refaire une modification
        // ----------------------------------------------------

        else if (
            action.type === "modification"
        ) {

            appliquerDonnees(
                action.element,
                action.nouvellesDonnees
            );

        }


        historique.push(
            action
        );

    }
);


// ============================================================
// RESTAURER UN ÉVÉNEMENT
// ============================================================

function restaurerEvenement(
    evenement,
    donnees
) {

    evenement.donnees = {
        ...donnees
    };


    appliquerDonnees(
        evenement,
        donnees
    );


    if (
        !document.body.contains(evenement)
    ) {

        timelineEvents.appendChild(
            evenement
        );

    }

}


// ============================================================
// APPLIQUER DES DONNÉES À UN ÉVÉNEMENT
// ============================================================

function appliquerDonnees(
    evenement,
    donnees
) {


    // Retirer des anciennes lignes

    lignes.forEach(
        function (ligne) {

            let index =
                ligne.findIndex(
                    function (element) {

                        return (
                            element.element ===
                            evenement
                        );

                    }
                );


            if (index !== -1) {

                ligne.splice(
                    index,
                    1
                );

            }

        }
    );


    // Données

    evenement.donnees = {
        ...donnees
    };


    // Visuel

    evenement.style.backgroundColor =
        donnees.couleur;


    evenement.style.top =
        (donnees.ligne * 100 + 20) +
        "px";


    evenement.style.left =
        (
            donnees.debut -
            debutVisibleFrise
        ) +
        "px";


    evenement.style.width =
        Math.max(
            donnees.fin -
            donnees.debut,
            120
        ) + "px";


    evenement.querySelector(
        ".titreEvenement"
    ).textContent =
        donnees.titre;


    evenement.querySelector(
        ".dateEvenement"
    ).textContent =
        formaterDate(
            donnees.jourDebut,
            donnees.moisDebut,
            donnees.anneeDebut
        )
        +
        " → "
        +
        formaterDate(
            donnees.jourFin,
            donnees.moisFin,
            donnees.anneeFin
        );


    // Ligne

    if (!lignes[donnees.ligne]) {

        lignes[donnees.ligne] = [];

    }


    lignes[donnees.ligne].push({

        debut: donnees.debut,

        fin: donnees.fin,

        element: evenement

    });

}


// ============================================================
// CENTRER LA VUE SUR UN ÉVÉNEMENT
// ============================================================

function centrerSurEvenement(
    evenement
) {

    let position =
        parseFloat(
            evenement.style.left
        );


    let largeur =
        parseFloat(
            evenement.style.width
        );


    let centreEvenement =
        (
            position +
            largeur / 2
        ) * coefficient;


    let centreWorkspace =
        workspace.clientWidth / 2;


    offsetX =
        centreWorkspace -
        centreEvenement;


    mettreAJourFrise();

}


// ============================================================
// DÉPLACEMENT DE LA FRISE
// ============================================================

let deplacement = false;

let debutSourisX = 0;
let debutSourisY = 0;

let offsetDepartX = 0;
let offsetDepartY = 0;


workspace.addEventListener(
    "pointerdown",
    function (event) {


        // Ne pas déplacer quand on clique sur un bouton
        // ou un événement

        if (
            event.target.closest(
                ".evenement"
            )
        ) {

            return;

        }


        deplacement = true;


        debutSourisX =
            event.clientX;


        debutSourisY =
            event.clientY;


        offsetDepartX =
            offsetX;


        offsetDepartY =
            offsetY;


        workspace.setPointerCapture(
            event.pointerId
        );

    }
);


workspace.addEventListener(
    "pointermove",
    function (event) {


        if (!deplacement) {

            return;

        }


        let differenceX =
            event.clientX -
            debutSourisX;


        let differenceY =
            event.clientY -
            debutSourisY;


        offsetX =
            offsetDepartX +
            differenceX;


        offsetY =
            offsetDepartY +
            differenceY;


        mettreAJourFrise();

    }
);


workspace.addEventListener(
    "pointerup",
    function () {

        deplacement = false;

    }
);


workspace.addEventListener(
    "pointercancel",
    function () {

        deplacement = false;

    }
);


// ============================================================
// CLIQUER DANS LE VIDE
// ============================================================

workspace.addEventListener(
    "click",
    function (event) {


        if (
            event.target === workspace
        ) {

            if (
                evenementSelectionne !== null
            ) {

                evenementSelectionne.classList.remove(
                    "selectionne"
                );

                evenementSelectionne = null;

            }

        }

    }
);


// ============================================================
// INITIALISATION
// ============================================================

mettreAJourFrise();
