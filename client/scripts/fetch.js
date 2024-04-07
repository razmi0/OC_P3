// Ce fichier contient les fonctions qui permettent de récupérer les données de l'API
// Elles sont importées dans le script principal pour être utilisées main.js
// TODO (#1) : rajouter des conditions pour gérer les erreurs de fetch
// --
const worksURL = "http://localhost:5678/api/works";
const categoriesURL = "http://localhost:5678/api/categories";

const getWorks = async () => {
  const response = await fetch(worksURL);
  return await response.json();
};

const getCategories = async () => {
  const response = await fetch(categoriesURL);
  return await response.json();
};

export { getWorks, getCategories };
