let charactersData = [];
const container = document.getElementById('characters-container');
const searchBar = document.getElementById('searchBar');

// 1. Récupérer les données du fichier JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        charactersData = data;
        displayCharacters(charactersData);
    })
    .catch(error => console.error("Erreur de chargement des données :", error));

// 2. Fonction pour afficher les fiches
function displayCharacters(characters) {
    container.innerHTML = '';

    if(characters.length === 0) {
        container.innerHTML = '<p style="padding: 20px; font-family: Satoshi; grid-column: 1 / -1;">Aucun dossier trouvé pour cette recherche.</p>';
        return;
    }

    characters.forEach((char, index) => {
        // Création de la carte avec les classes de ton CSS
        const card = document.createElement('div');
        // J'utilise tes classes d'animation (kd-reveal kd-visible) pour un effet propre
        card.className = 'card kd-reveal kd-visible'; 
        // Effet d'apparition en cascade grâce à ton CSS
        card.style.transitionDelay = `${(index % 3) * 0.1}s`; 

        const skinUrl = `https://minotar.net/armor/body/${char.pseudo}/200.png`;

        card.innerHTML = `
            <img src="${skinUrl}" alt="Skin de ${char.pseudo}" class="card-img">
            <div class="card-cat">${char.faction}</div>
            <h2 class="card-title">${char.nomRP}</h2>
            <p class="card-excerpt">${char.description}</p>
            <div class="card-byline">
                PSEUDO MC: <strong>${char.pseudo}</strong> <br>
                ÂGE: <strong>${char.age}</strong>
            </div>
            <div class="card-btn" style="cursor: pointer;">Consulter</div>
        `;

        container.appendChild(card);
    });
}

// 3. Écouter la barre de recherche
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = charactersData.filter(char => {
        return char.nomRP.toLowerCase().includes(searchString) || 
               char.pseudo.toLowerCase().includes(searchString);
    });

    displayCharacters(filteredCharacters);
});
