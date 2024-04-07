import { getWorks, getCategories } from "./fetch.js";
import { createGroupedWorks, attachListeners, createFilters, displayWorks } from "./script.js";

const gallery = document.querySelector("#gallery");
if (!gallery) throw new Error("No gallery found");
const filters = document.querySelector("#filtersSection");
if (!filters) throw new Error("No filters found");

// Récupérer les données
// --
const worksData = await getWorks();
const categoriesData = await getCategories();

// Organiser les données
// --
const groupedWorks = createGroupedWorks(categoriesData, worksData);

// Creer les filtres
// --
const allFiltersElements = createFilters(filters, categoriesData);

// Poser les listeners
// --
attachListeners(gallery, groupedWorks, allFiltersElements);

// Afficher les works
// --
displayWorks(gallery, groupedWorks, "0");
