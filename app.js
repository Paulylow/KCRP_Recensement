let charactersData = [];
const container = document.getElementById('characters-container');
const searchBar = document.getElementById('searchBar');

// Vues
const homeView = document.getElementById('home-view');
const dossierView = document.getElementById('dossier-view');
const btnRetour = document.getElementById('btn-retour');

// Éléments de la page Dossier
const pNom = document.getElementById('page-nom');
const pFaction = document.getElementById('page-faction');
const pSkin = document.getElementById('page-skin-img');
const pPseudo = document.getElementById('page-pseudo');
const pAge = document.getElementById('page-age');
const pAccroche = document.getElementById('page-accroche');
const pDesc = document.getElementById('page-desc');
const pId = document.getElementById('page-id-val');

// 1. Charger les données JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        charactersData = data;
        displayCharacters(charactersData);
    })
    .catch(error => console.error("Erreur de chargement :", error));

// 2. Afficher les cartes sur l'accueil
function displayCharacters(characters) {
    container.innerHTML = '';

    if(characters.length === 0) {
        container.innerHTML = '<p style="padding: 20px; font-family: Satoshi; grid-column: 1 / -1;">Aucun citoyen trouvé.</p>';
        return;
    }

    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'card kd-reveal kd-visible'; 
        card.style.transitionDelay = `${(index % 3) * 0.1}s`; 

        // Nouvelle API pour le skin (mc-heads)
        const skinUrl = `https://mc-heads.net/body/${char.pseudo}/250`;

        card.innerHTML = `
            <img src="${skinUrl}" alt="Skin de ${char.pseudo}" class="card-img">
            <div class="card-cat">${char.faction}</div>
            <h2 class="card-title">${char.nomRP}</h2>
            <p class="card-excerpt">${char.accroche}</p>
            <div class="card-byline">
                PSEUDO MC: <strong>${char.pseudo}</strong> <br>
                ÂGE: <strong>${char.age}</strong>
            </div>
            <div class="card-btn" style="cursor: pointer; text-align: center; width: 100%;">CONSULTER</div>
        `;

        card.querySelector('.card-btn').addEventListener('click', () => openDossier(char));
        container.appendChild(card);
    });
}

// 3. Ouvrir la "Nouvelle Page" Dossier
function openDossier(char) {
    pNom.textContent = char.nomRP;
    pFaction.textContent = char.faction;
    // Skin en très haute qualité pour la page
    pSkin.src = `https://mc-heads.net/body/${char.pseudo}/500`; 
    pPseudo.textContent = char.pseudo;
    pAge.textContent = char.age;
    pAccroche.textContent = `« ${char.accroche} »`;
    pDesc.textContent = char.description;

    // Numéro de citoyen logique
    const realId = charactersData.findIndex(c => c.pseudo === char.pseudo) + 1;
    pId.textContent = "#" + realId.toString().padStart(4, '0');

    // Cacher l'accueil, afficher le dossier, et remonter en haut de la page
    homeView.style.display = 'none';
    dossierView.style.display = 'block';
    window.scrollTo(0, 0);
}

// 4. Bouton Retour
btnRetour.addEventListener('click', () => {
    dossierView.style.display = 'none';
    homeView.style.display = 'block';
    window.scrollTo(0, 0); // Remonte en haut de l'accueil
});

// 5. Barre de recherche
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = charactersData.filter(char => {
        return char.nomRP.toLowerCase().includes(searchString) || 
               char.pseudo.toLowerCase().includes(searchString);
    });
    displayCharacters(filteredCharacters);
});
