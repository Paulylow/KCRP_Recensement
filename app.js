let charactersData = [];
const container = document.getElementById('characters-container');
const searchBar = document.getElementById('searchBar');

// Éléments du modal
const modal = document.getElementById('dossier-modal');
const closeBtn = document.getElementById('close-modal');
const mNom = document.getElementById('modal-nom');
const mFaction = document.getElementById('modal-faction');
const mSkin = document.getElementById('modal-skin-img');
const mPseudo = document.getElementById('modal-pseudo');
const mAge = document.getElementById('modal-age');
const mAccroche = document.getElementById('modal-accroche');
const mDesc = document.getElementById('modal-desc');
const mId = document.getElementById('modal-id-val');

// 1. Récupérer les données du fichier JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        charactersData = data;
        displayCharacters(charactersData);
    })
    .catch(error => console.error("Erreur de chargement des données :", error));

// 2. Afficher les fiches
function displayCharacters(characters) {
    container.innerHTML = '';

    if(characters.length === 0) {
        container.innerHTML = '<p style="padding: 20px; font-family: Satoshi; grid-column: 1 / -1;">Aucun citoyen trouvé pour cette recherche.</p>';
        return;
    }

    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'card kd-reveal kd-visible'; 
        card.style.transitionDelay = `${(index % 3) * 0.1}s`; 

        const skinUrl = `https://minotar.net/armor/body/${char.pseudo}/200.png`;

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

        card.querySelector('.card-btn').addEventListener('click', () => openModal(char));
        container.appendChild(card);
    });
}

// 3. Ouvrir le dossier public
function openModal(char) {
    mNom.textContent = char.nomRP;
    mFaction.textContent = char.faction;
    mSkin.src = `https://minotar.net/armor/body/${char.pseudo}/300.png`; 
    mPseudo.textContent = char.pseudo;
    mAge.textContent = char.age;
    
    mAccroche.textContent = `« ${char.accroche} »`;
    mDesc.textContent = char.description;

    // NUMÉRO LOGIQUE : On cherche la vraie position du joueur dans la base de données
    const realId = charactersData.findIndex(c => c.pseudo === char.pseudo) + 1;
    // padStart permet de forcer le format 4 chiffres (ex: "1" devient "0001")
    mId.textContent = "#" + realId.toString().padStart(4, '0');

    modal.classList.add('active'); 
}

// 4. Fermeture
closeBtn.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

// 5. Recherche
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = charactersData.filter(char => {
        return char.nomRP.toLowerCase().includes(searchString) || 
               char.pseudo.toLowerCase().includes(searchString);
    });
    displayCharacters(filteredCharacters);
});
