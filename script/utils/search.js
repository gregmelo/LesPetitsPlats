// @ts-nocheck

import { recipes } from "../../data/recipes.js"; // On importe les recettes depuis un fichier de données
import { filterDropdown } from "../templates/dropdownTemplate.js"; // On importe la fonction pour filtrer les éléments du menu déroulant
import { createRecipeCard } from "../templates/recipesCardTemplate.js"; // On importe la fonction pour créer des cartes de recettes
import { updateCounter } from "./counter.js"; // On importe la fonction pour mettre à jour le compteur de recettes
import { extractUniqueItems } from "./extractUniqueItems.js"; // On importe la fonction pour extraire les éléments uniques (ingrédients, appareils, ustensiles)
import { removeSpacesAndAccents } from "./removeSpacesAndAccents.js"; // On importe la fonction pour normaliser les chaînes de caractères
import { addItemsToDropdown } from "../page/index.js";

// On utilise des objets pour garder les filtres actifs
// On utilise Set pour stocker les filtres actifs, garantissant ainsi l'unicité des éléments
export const activeFilters = {
  ingredients: new Set(),
  appliances: new Set(),
  ustensils: new Set(),
};

// Fonction de gestion de la recherche
export function handleSearch(event) {
  // On récupère la requête de recherche à partir de l'événement et on la met en minuscules
  const query = event
    ? event.target.value.toLowerCase()
    : document.querySelector("#search-bar").value.toLowerCase();

  // On vérifie si la requête de recherche comporte au moins 3 caractères ou s'il y a des filtres actifs
  if (query.length >= 3 || hasActiveFilters()) {
    // On filtre les recettes en fonction de la requête de recherche
    const filteredRecipes = filterRecipes(query);
    // On met à jour l'affichage avec les recettes filtrées
    updateDisplay(filteredRecipes);
  } else {
    // Si la requête est trop courte, on affiche toutes les recettes
    updateDisplay(recipes);
  }
}

// Fonction pour vérifier s'il y a des filtres actifs
export function hasActiveFilters() {
  return (
    activeFilters.ingredients.size > 0 ||
    activeFilters.appliances.size > 0 ||
    activeFilters.ustensils.size > 0
  );
}

// Fonction de filtrage des recettes en fonction de la requête de recherche
export function filterRecipes(query) {
  console.log("Filtres actifs:", activeFilters);
  
  // Normaliser la requête
  const normalizedQuery = removeSpacesAndAccents(query);

  return recipes.filter((recipe) => {
    // Normaliser les champs de la recette pour la comparaison
    const normalizedTitle = removeSpacesAndAccents(recipe.name);
    const normalizedDescription = removeSpacesAndAccents(recipe.description);
    const normalizedAppliance = removeSpacesAndAccents(recipe.appliance);

    // Vérifie si le titre de la recette correspond à la requête
    const titleMatch = normalizedTitle.includes(normalizedQuery);

    // Vérifie si l'un des ingrédients correspond à la requête
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      removeSpacesAndAccents(ingredient.ingredient).includes(normalizedQuery)
    );

    // Vérifie si la description correspond à la requête
    const descriptionMatch = normalizedDescription.includes(normalizedQuery);

    // Vérifie si l'appareil utilisé correspond à la requête
    const applianceMatch = normalizedAppliance.includes(normalizedQuery);

    // Vérifie si l'un des ustensiles correspond à la requête
    const ustensilMatch = recipe.ustensils.some((ustensil) =>
      removeSpacesAndAccents(ustensil).includes(normalizedQuery)
    );

    // Vérifie si la recette correspond à l'une des conditions de recherche
    const matchesQuery =
      titleMatch ||
      ingredientMatch ||
      descriptionMatch ||
      applianceMatch ||
      ustensilMatch;

    // Vérifie si la recette correspond aux filtres actifs
    const matchesFilters =
      [...activeFilters.ingredients].every((filter) =>
        recipe.ingredients.some(
          (ingredient) =>
            removeSpacesAndAccents(ingredient.ingredient) === removeSpacesAndAccents(filter)
        )
      ) &&
      [...activeFilters.appliances].every(
        (filter) => removeSpacesAndAccents(recipe.appliance) === removeSpacesAndAccents(filter)
      ) &&
      [...activeFilters.ustensils].every((filter) =>
        recipe.ustensils.some(
          (ustensil) =>
            removeSpacesAndAccents(ustensil) === removeSpacesAndAccents(filter)
        )
      );

    // Retourne vrai si la recette correspond à la fois à la recherche et aux filtres
    return matchesQuery && matchesFilters;
  });
}


// Fonction de mise à jour de l'affichage des recettes
export function updateDisplay(filteredRecipes) {
  // On vide l'affichage actuel des recettes
  const recipeContainer = document.querySelector("#recipes-container");
  if (recipeContainer) {
    recipeContainer.innerHTML = "";
  }

  // On vérifie que filteredRecipes est un tableau
  if (!Array.isArray(filteredRecipes)) {
    console.log("filteredRecipes doit être un tableau");
    return;
  }

  // On affiche les recettes filtrées sous forme de cartes
  const cards = createRecipeCard(filteredRecipes);
  updateCounter(); // Met à jour le compteur de recettes

  // On met à jour les listes déroulantes en fonction des recettes filtrées
  updateDropdowns(filteredRecipes);
}

// Fonction de mise à jour des listes déroulantes
function updateDropdowns(filteredRecipes) {
  const { ingredientsSet, appliancesSet, ustensilsSet } =
    extractUniqueItems(filteredRecipes);

  // Sauvegarde l'état des éléments sélectionnés
  const selectedItems = {
    ingredients: new Set(
      [
        ...document.querySelectorAll("#ingredients .dropdown-item.selected"),
      ].map((item) => item.textContent.trim())
    ),
    appliances: new Set(
      [...document.querySelectorAll("#appliances .dropdown-item.selected")].map(
        (item) => item.textContent.trim()
      )
    ),
    ustensils: new Set(
      [...document.querySelectorAll("#ustensils .dropdown-item.selected")].map(
        (item) => item.textContent.trim()
      )
    ),
  };

  updateDropdown("ingredients", ingredientsSet, selectedItems.ingredients);
  updateDropdown("appliances", appliancesSet, selectedItems.appliances);
  updateDropdown("ustensils", ustensilsSet, selectedItems.ustensils);
}

function updateDropdown(type, items, selectedItems) {
  // On récupère le contenu du menu déroulant pour le type donné
  const dropdownContent = document.querySelector(`#${type} .dropdown-content`);
  if (dropdownContent) {
    dropdownContent.innerHTML = "";
  }

  const formSearch = document.createElement("form");
  formSearch.className = "form-dropdown";

  const searchInputDropdown = document.createElement("input");
  searchInputDropdown.type = "text";
  searchInputDropdown.name = "searchDropdown";
  searchInputDropdown.className = "searchDropdown";
  searchInputDropdown.oninput = () =>
    filterDropdown(searchInputDropdown, dropdownContent);

  const searchIcon = document.createElement("img");
  searchIcon.src = "./assets/icons/Loop_CTA_grey.svg";
  searchIcon.className = "search-iconDropdown";
  searchIcon.alt = "Icône de recherche";

  const clearIconDropdown = document.createElement("img");
  clearIconDropdown.src = "./assets/icons/xmark_grey.svg";
  clearIconDropdown.className = "clear-iconDropdown";
  clearIconDropdown.alt = "Icône de suppression";
  clearIconDropdown.style.display = "none";

  formSearch.appendChild(searchInputDropdown);
  formSearch.appendChild(clearIconDropdown);
  formSearch.appendChild(searchIcon);
  dropdownContent.appendChild(formSearch);

  // Fonction addItemsToDropdown pour ajouter les items
  addItemsToDropdown(type, items);

  // Restaure l'état des éléments sélectionnés
  items.forEach((item) => {
    const itemId = `item-${removeSpacesAndAccents(item)}`;
    const option = document.getElementById(itemId);
    if (selectedItems.has(item)) {
      option.classList.add("selected");
      const clearItem = option.querySelector(".clear-iconItems");
      if (clearItem) {
        clearItem.style.display = "block";
      }
    }
  });
}
