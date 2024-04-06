//@ts-check
"use strict";

import { getCategories, getWorks } from "./fetch.js";

// TYPES
/**
 * @typedef {import("./typedefs.js").WorksDataType} WorksDataType
 * @typedef {import("./typedefs.js").CategoryType} CategoryType
 */

// DOM ELEMENTS
const selectGallery = document.querySelector("#gallery");
if (!selectGallery) throw new Error("No gallery found");
const filters = document.querySelector("#filtersSection");
if (!filters) throw new Error("No filters found");

// MAIN
// Récupérer les données
const worksData = await getWorks();
console.log(worksData);

const categoriesData = await getCategories();
console.log(categoriesData);

/**
 * buildGroupedWorks fabrique une map (comme un objet ) avec les works groupés par catégorie.
 * Une map est plus efficace qu'un objet pour stocker des paires clé-valeur et écrire régulièrement les données à l'interieur.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * @returns {Map<CategoryType["name"], WorksDataType[]>}
 */
const buildGroupedWorks = () => {
  let groupedWorks = new Map();

  categoriesData.forEach((category) => {
    const key = category.name;
    const works = worksData.filter((work) => work.categoryId === category.id);
    groupedWorks.set(key, works);
  });

  // On verifie que tous les works ont leur catégorie dans la map
  const isCategoryComplete = worksData.every((work) => groupedWorks.has(work.category.name));
  if (!isCategoryComplete) console.warn("Certaine catégories n'ont pas de works associés.");

  // On verifie que tous les works sont dans la map
  const worksTotal = worksData.length;
  let worksTotalInMap = 0;
  for (const works of groupedWorks.values()) {
    worksTotalInMap += works.length;
  }
  if (worksTotal !== worksTotalInMap) console.warn("Tous les works ne sont pas dans la map.");

  // On rajoute la catégorie "Tous" manuellement
  const key = "Tous";
  const works = worksData;
  groupedWorks.set(key, works);

  // A ce niveau là on obtient :
  // {"Objets" => Array(2)}
  // {"Appartements" => Array(6)}
  // {"Hotels & restaurants" => Array(3)}
  // {"Tous" => Array(11)}
  // On va pouvoir facilement accéder aux works par catégorie quand on cliquera sur un filtre
  return groupedWorks;
};

const groupedWorks = buildGroupedWorks();

/**
 * Afficher Works
 *
 * <div class="gallery" id="gallery">
 *    <figure>
 *      <img src="images/abajour-tahina.png" alt="Abajour Tahina" />
 *      <figcaption>Abajour Tahina</figcaption>
 *    </figure>
 *    ...
 */
const displayWorks = () => {
  worksData.forEach((work) => {
    const elementsWork = document.createElement("figure");
    const caption = document.createElement("figcaption");
    const img = document.createElement("img");

    img.src = work.imageUrl;
    img.textContent = work.title;
    caption.textContent = work.title;
    elementsWork.setAttribute("data-work-id", work.id);

    elementsWork.appendChild(img);
    elementsWork.appendChild(caption);
    selectGallery.appendChild(elementsWork);
  });
};
displayWorks();

//creer les filtres
// Tous , objets, appartement, hotel & restaurant
const createFilters = (categoriesData, filter) => {
  const allWorksElements = document.createElement("li");

  allWorksElements.textContent = "Tous";
  allWorksElements.classList.add("filters");

  filter.appendChild(allWorksElements);

  categoriesData.forEach((category) => {
    const elementsList = document.createElement("li");

    elementsList.textContent = category.name;
    elementsList.setAttribute("data-categories-id", category.id);

    elementsList.classList.add("filters");

    filter.appendChild(elementsList);
  });
};

// afficher categories
const displayCategories = () => {
  const filtersUl = document.createElement("ul");
  filtersUl.classList.add("categories");

  filters.appendChild(filtersUl);

  createFilters(categoriesData, filtersUl);
};

displayCategories();

// au click ...
const click = (works) => {
  filters.addEventListener("click", (event) => {
    const selectedCategoryId = event.target.getAttribute("data-categories-id"); // Récupérer l'ID de la catégorie sélectionnée
    console.log(selectedCategoryId);

    if (selectedCategoryId !== "all") {
      //si le click et diff de all on filtre sinon on garde les works
      const filteredWorks = works.filter((work) => work.categoryId === selectedCategoryId);
      displayWorks(filteredWorks);
    } else {
      displayWorks(works);
    }
  });
};

export {};
