let charactersData = [];
const container = document.getElementById('characters-container');
const searchBar = document.getElementById('searchBar');

// 1. Récupérer les données du fichier JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        charactersData = data;
        displayCharacters(charactersData); // Afficher tout au chargement
    })
    .catch(error => console.error("Erreur de chargement des données :", error));

// 2. Fonction pour afficher les fiches
function displayCharacters(characters) {
    container.innerHTML = ''; // On vide le conteneur

    if(characters.length === 0) {
        container.innerHTML = '<p>Aucun personnage trouvé...</p>';
        return;
    }

    characters.forEach(char => {
        // Création de la carte (fiche)
        const card = document.createElement('div');
        card.className = 'card';

        // L'URL de Minotar pour récupérer le corps en 3D
        // Tu peux changer "armor/body" par "cube" pour juste la tête
        const skinUrl = `https://minotar.net/armor/body/${char.pseudo}/150.png`;

        card.innerHTML = `
            <img src="${skinUrl}" alt="Skin de ${char.pseudo}">
            <h2>${char.nomRP}</h2>
            <p class="pseudo">Pseudo MC: ${char.pseudo}</p>
            <p class="info"><strong>Âge:</strong> ${char.age}</p>
            <p class="info"><strong>Faction:</strong> ${char.faction}</p>
            <p class="desc">${char.description}</p>
        `;

        container.appendChild(card);
    });
}

// 3. Écouter la barre de recherche
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();

    // Filtrer par pseudo OU par nom RP
    const filteredCharacters = charactersData.filter(char => {
        return char.nomRP.toLowerCase().includes(searchString) || 
               char.pseudo.toLowerCase().includes(searchString);
    });

    // Mettre à jour l'affichage avec les résultats filtrés
    displayCharacters(filteredCharacters);
});
