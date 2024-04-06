//@ts-check
"use strict";

import { getCategories, getWorks } from "./fetch.js";

// TYPES
/**
 * @typedef {import("./typedefs.js").WorksDataType} WorksDataType
 * @typedef {import("./typedefs.js").CategoryType} CategoryType
 */

const selectGallery = document.querySelector("#gallery");
if (!selectGallery) throw new Error("No gallery found");
const filters = document.querySelector("#filtersSection");
if (!filters) throw new Error("No filters found");
let filteredWorks;

// afficher wokrs
const displayWorks = (worksData) => {
  selectGallery.innerHTML = "";

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

// afficher categories
const displayCategories = (categoriesData, works) => {
  const filtersUl = document.createElement("ul");
  filtersUl.classList.add("categories");

  filters.appendChild(filtersUl);

  createFilters(categoriesData, filtersUl, works);
};

//creer les filtres
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

//appeler les fonctions
const worksData = await getWorks();
console.log(worksData);

const categoriesData = await getCategories();
console.log(categoriesData);

displayWorks(worksData);
displayCategories(categoriesData, worksData);

export {};
