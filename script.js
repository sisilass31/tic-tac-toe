/*fonction valide permet de savoir si une case est vide. dans la fonction on déclare que lorsque la longueur de mon bouton est 0 cela voudrait 
dire qu'elle est vide*/

function valide(button) {
    return button.innerHTML.length == 0; 
} //console.log(valide);

/*fonction symbol permet de*/

function symbol(btn, symbole) {
    btn.innerHTML = symbole;
} //console.log(symbol);

/*les conditions de victoire= 
horizontales: [0, 1, 2],[3, 4, 5],[6, 7, 8],
verticales: [0, 3, 6],[1, 4, 7],[2, 5, 8],
diagonales: [0, 4, 8],[2, 4, 6]*/

/*fonction permettant de trouver les conditions de victoires et d'appliquer un background color lors d'une victoire sur les 3 pions
on applique 3 paramètres dans notre fonction searchwin = (pions, players et turn)*/

function searchwin(pions, players, turn) {
    if (
        pions[0].innerHTML == players[turn] &&
        pions[1].innerHTML == players[turn] &&
        pions[2].innerHTML == players[turn] 
    ) {
        pions[0].style.backgroundColor = "#3373b0";
        pions[1].style.backgroundColor = "#3373b0";
        pions[2].style.backgroundColor = "#3373b0";
        return true;
    }
    
    if (
        pions[3].innerHTML == players[turn] &&
        pions[4].innerHTML == players[turn] &&
        pions[5].innerHTML == players[turn]
    ) {
        pions[3].style.backgroundColor = "#3373b0";
        pions[4].style.backgroundColor = "#3373b0";
        pions[5].style.backgroundColor = "#3373b0";
        return true;
    }

    if (
        pions[6].innerHTML == players[turn] &&
        pions[7].innerHTML == players[turn] &&
        pions[8].innerHTML == players[turn]
    ) {
        pions[6].style.backgroundColor = "#3373b0";
        pions[7].style.backgroundColor = "#3373b0";
        pions[8].style.backgroundColor = "#3373b0";
        return true;
    }

    if (
        pions[0].innerHTML == players[turn] &&
        pions[3].innerHTML == players[turn] &&
        pions[6].innerHTML == players[turn]
    ) {
        pions[0].style.backgroundColor = "#3373b0";
        pions[3].style.backgroundColor = "#3373b0";
        pions[6].style.backgroundColor = "#3373b0";
        return true;
    }

    if (
        pions[1].innerHTML == players[turn] &&
        pions[4].innerHTML == players[turn] &&
        pions[7].innerHTML == players[turn]
    ) {
        pions[1].style.backgroundColor = "#3373b0";
        pions[4].style.backgroundColor = "#3373b0";
        pions[7].style.backgroundColor = "#3373b0";
        return true;
    }

    if (
        pions[2].innerHTML == players[turn] &&
        pions[5].innerHTML == players[turn] &&
        pions[8].innerHTML == players[turn]
    ) {
        pions[2].style.backgroundColor = "#3373b0";
        pions[5].style.backgroundColor = "#3373b0";
        pions[8].style.backgroundColor = "#3373b0";
        return true;
    }

    if (
        pions[0].innerHTML == players[turn] &&
        pions[4].innerHTML == players[turn] &&
        pions[8].innerHTML == players[turn]
    ) {
        pions[0].style.backgroundColor = "#3373b0";
        pions[4].style.backgroundColor = "#3373b0";
        pions[8].style.backgroundColor = "#3373b0";
        return true;
    }

    if (
        pions[2].innerHTML == players[turn] &&
        pions[4].innerHTML == players[turn] &&
        pions[6].innerHTML == players[turn]
    ) {
        pions[2].style.backgroundColor = "#3373b0";
        pions[4].style.backgroundColor = "#3373b0";
        pions[6].style.backgroundColor = "#3373b0";
        return true;
    }
    console.log(players[turn])
}

// fonction permettant de trouver les conditions de victoires et d'appliquer un background color lors d'une victoire

function tiegame(pions) {
    for (let i = 0, len = pions.length; i < len; i++) {
        if (pions[i].innerHTML.length == 0) return false;
    }
    return true;
}

// permet d'afficher les messages

let Afficheur = function (element) {
    let affichage = element;

    function setText(message) {
        affichage.innerHTML = message;
    }

    return { sendMessage: setText };
};

// fonction permettant de trouver les conditions de victoires et d'appliquer un background color lors d'une victoire

function main() {
    let pions = document.querySelectorAll("#jeu button"); //récupère tous les boutons du jeu
    let joueurs = ["X", "O"]; // déclare les deux joueurs
    let turn = 0; //initialise la variable pour le tour actuel
    let findujeu = false;
    //en utilisant la méthode ".sendMessage" de l'objet afficheur on affiche le message d'accueil.
    let afficheur = new Afficheur(document.querySelector("#status")); //new est utilisée pour créer une nouvelle instance d'un objet
    afficheur.sendMessage(
        "le jeu peut commencer ! <br/> joueur " + joueurs[turn] + " c'est votre tour.");
    /* la boucle for est utilisée pour ajouter un événements de click sur chaque bouton du jeu. À chaque clic, la fonction click est exécutée.
    pour chaque itérations, tant que i est inferieur à len (= pions.length) alors i s'incrémentera:*/
    for (let i = 0, len = pions.length; i < len; i++) {
        // console.log(pions[i]);
        pions[i].addEventListener("click", function () {
            //si le jeu est terminé, la fonction return 
            if (findujeu) return;
            // sinon la fonction vérifie si la case est valide 
            if (!valide(this)) {
                // si la case est occupée alors il affiche qu'elle est occupée dans le status
                afficheur.sendMessage(
                    "case occupée ! <br />joueur " + joueurs[turn] + " c'est toujours votre tour !");
            } 
            // sinon grâce à la fonction "searchwin", on vérifie s'il y a un gagnant ou non en appelant 
            else {
                symbol(this, joueurs[turn]);
                findujeu = searchwin(pions, joueurs, turn);
                // si un joueur a gagné, un message de victoire est affiché
                if (findujeu) {
                    afficheur.sendMessage(
                        "Le joueur " + joueurs[turn] + ' gagné! 🎉 <br /> <a href="index.html">rejouer</a>'
                    ); return;
                }
                // si il y a égalité alors il l'affiche
                if (tiegame(pions)) {
                    afficheur.sendMessage(
                        'égalité! <br/> <a href="index.html">réessayer</a>'
                    ); return;
                }
                // le tour s'incrémentera tant que ttes les cases ne  sont pas occupées et le message du tour suivant est affiché
                turn++; 
                turn = turn % 2;
                afficheur.sendMessage("joueur " + joueurs[turn] + " c'est votre tour !");
            }
        });
    }
}
main();