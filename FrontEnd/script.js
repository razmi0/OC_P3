// Fonction asynchrone pour récupérer des œuvres depuis l'API
async function getWorksFromAPI() {
    try {
      const apiUrlWorks = 'http://localhost:5678/api/works';
      const response = await fetch(apiUrlWorks);
  
      if (!response.ok) {
        throw new Error(`Erreur de récupération des données. Statut : ${response.status}`);
      }
  
      const works = await response.json();
  
      console.log('Projet de Sophie Bluel:', works);
  
      return works; // afficher les projets 

    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors de la récupération des œuvres :', error);
      throw error; // Vous pouvez relancer l'erreur si nécessaire
    }
  }
  
  getWorksFromAPI();
  

  // Fonction asynchrone pour mettre à jour la galerie avec les œuvres récupérées
async function AddWorksGallery() {
    try {
        // Récupérer les œuvres depuis l'API
        const works = await getWorksFromAPI();

        // Sélectionner les éléments de la galerie dans le DOM
        const galleryElements = document.querySelector('.gallery');

        // Supprimer les travaux existants du HTML
        galleryElements.innerHTML = '';

        // Parcourir les œuvres et ajouter chaque travaux à la galerie
        works.forEach(work => {
            const figureElement = document.createElement('figure');
            const imgElement = document.createElement('img');
            const figcaptionElement = document.createElement('figcaption');

            imgElement.src = work.imageUrl; 
            imgElement.alt = work.title; 
            figcaptionElement.textContent = work.title; 

            figureElement.appendChild(imgElement);
            figureElement.appendChild(figcaptionElement);

            galleryElements.appendChild(figureElement);
        });

    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la mise à jour de la galerie :', error);
    
    }
}

AddWorksGallery();
