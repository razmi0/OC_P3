"use strict";
// --
// Ce fichiers contient toutes les fonctions. Elles sont exportées pour être utilisées dans le script principal main.js
// --
// TODO (#1) : createGroupedWorks procède à deux vérifications : refactoriser en deux fonctions distinctes de verification : checkCategoriesComplete et checkWorksComplete
// TODO (#2) : supprimer l'entrée "Tous" de la map et utiliser directement worksData pour afficher tous les works
// TODO (#3) : écrire une fonction qui construit le HTML
//             Exemple : createNodes("figure", { class : ""}, children : { img : { src : "" }, figcaption : { textContent : "" } })
// TODO (#4) : utliser la fonction createNodes pour construire le HTML de displayWorks et createFilters
// --

/**
 * @description createGroupedWorks fabrique une map (comme un objet) avec les works groupés par catégorie.
 * Une map est plus efficace qu'un objet pour stocker des paires clé-valeur et écrire régulièrement les données à l'interieur (peut être plus tard ??..).
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
const createGroupedWorks = (categoriesData, worksData) => {
  // Notre variable de départ est une map vide, on va le remplir dans la prochaine boucle forEach
  // --
  let groupedWorks = new Map();

  // On boucle sur les catégories pour créer les entrées dans la map pour chaque catégorie
  // --
  categoriesData.forEach((category) => {
    const key = category.id.toString(); // Exemple : "1" pour Objets
    const works = worksData.filter((work) => work.categoryId === category.id); // On filtre les works en utilisant l'équivalence des ID de catégorie
    groupedWorks.set(key, works); // Exemple : {"1" => [work1, work2]}
  });

  // On verifie que tous les works ont leur catégorie dans la map
  //--
  const isCategoryComplete = worksData.every((work) => groupedWorks.has(work.categoryId.toString()));
  if (!isCategoryComplete) console.warn("Certaine catégories n'ont pas de works associés.");

  // On verifie que tous les works sont dans la map en comparant le nombre de works total avec le nombre de works dans la map
  // --
  const numberOfWorks = worksData.length;
  let numberOfWorksInMap = 0;
  for (const works of groupedWorks.values()) {
    numberOfWorksInMap += works.length;
  }
  const diff = numberOfWorks - numberOfWorksInMap;
  if (diff !== 0) console.warn("Tous les works ne sont pas dans la map. Il en manque : ", diff, " works.");

  // On rajoute la catégorie "Tous" manuellement avec tous les works avec l'id "0"
  // --
  groupedWorks.set("0", worksData);

  // A ce niveau là on obtient :
  // {"1" => Array(2)}   Objets
  // {"2" => Array(6)}   Appartements
  // {"3" => Array(3)}   Hotels & restaurants
  // {"0" => Array(11)}  Tous

  // Si une catégorie manque ou que un work n'est pas dans la map, on aura un warning en console
  // On va pouvoir facilement accéder aux works par catégorie quand on cliquera sur un filtre : groupedWorks.get("1")
  // --
  return groupedWorks;
};

/**
 * Afficher Works
 * @description On donne à displayWorks un catégorie id,
 * il va chercher les works associés dans groupedWorks
 * et contruire le HTML pour l'insérer dans la gallerie
 */
const displayWorks = (gallery, groupedWorks, categorieId) => {
  const selectedWorks = groupedWorks.get(categorieId);
  if (!selectedWorks) {
    console.warn(`La catégorie n'existe pas => id : ${categorieId} `);
    return;
  }

  gallery.innerHTML = ""; // On vide la gallerie avant de la remplir avec les works selectionnés

  selectedWorks.forEach((work) => {
    const elementsWork = document.createElement("figure");
    const caption = document.createElement("figcaption");
    const img = document.createElement("img");

    img.src = work.imageUrl;
    img.textContent = work.title;
    caption.textContent = work.title;
    // Chaque element de la gallerie a un attribut data-work-category-id qui correspond à l'ID de la catégorie
    // (ne sert à rien pour l'instant, supprimable)
    // --
    elementsWork.setAttribute("data-work-category-id", work.categoryId.toString());
    elementsWork.appendChild(img);
    elementsWork.appendChild(caption);
    gallery.appendChild(elementsWork);
  });
};

/**
 * Creer les filtres
 * @description Apres avoir creer le <ul>,
 * on boucle sur categorieData, on fabrique les <li>,
 * on les ajoute au <ul> puis
 * on stocke les <li> dans un tableau qui sera retourné pour poser les listeners dessus dans la prochaine fonction
 */
const createFilters = (filters, categoriesData) => {
  const filtersUl = document.createElement("ul");
  filtersUl.classList.add("categories");
  filters.appendChild(filtersUl);

  const allFiltersElements = [];

  // On rajoute "Tous" manuellement avec l'id "0"
  // --
  const tousElement = document.createElement("li");
  tousElement.textContent = "Tous";
  tousElement.setAttribute("data-categories-id", "0");
  tousElement.classList.add("filters");
  filtersUl.appendChild(tousElement);

  allFiltersElements.push(tousElement);

  categoriesData.forEach((category) => {
    const elementList = document.createElement("li");
    elementList.textContent = category.name;
    elementList.setAttribute("data-categories-id", category.id.toString());
    elementList.classList.add("filters");
    filtersUl.appendChild(elementList);

    // On stocke le <li> ici
    // --
    allFiltersElements.push(elementList);
  });

  return allFiltersElements;
};

/**
 * @description attachListeners boucle sur les <li> stocké dans allFiltersElements
 * et ajoute un eventListener au <li> sur l'event "click" qui déclenche la fonction handleClickFilter
 */
const attachListeners = (gallery, groupedWorks, allFiltersElements) => {
  /**
   * @description handleClickFilter est une fonction qui sera appelée à chaque click sur un filtre,
   * elle récupère l'ID de la catégorie selectionnée dans l'attribut data-categories-id
   * et appelle displayWorks avec les works groupés et la catégorie selectionnée
   * si l'attribut n'existe pas, on lui donne la valeur "0" correspondant à la catégorie "Tous" ( nullish coalescing )
   * @see https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
   * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
   */
  const handleClickFilter = (event) => {
    const target = event.target;
    const selectedCategoryId = target.dataset.categoriesId ?? "0";
    displayWorks(gallery, groupedWorks, selectedCategoryId);
  };

  allFiltersElements.forEach((element) => element.addEventListener("click", handleClickFilter));
};

// On exporte les fonctions pour les utiliser dans le script principal qui s'appelle main.js
// --
export { attachListeners, createFilters, createGroupedWorks, displayWorks };
