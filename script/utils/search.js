// @ts-nocheck

import { recipes } from "../../data/recipes.js"; // On importe les recettes depuis un fichier de données
import { createRecipeCard } from "../templates/recipesCardTemplate.js"; // On importe la fonction pour créer des cartes de recettes
import { extractUniqueItems } from "./extractUniqueItems.js"; // On importe la fonction pour extraire les éléments uniques (ingrédients, appareils, ustensiles)
import { removeSpacesAndAccents } from "./removeSpacesAndAccents.js"; // On importe la fonction pour normaliser les chaînes de caractères
import { addTag, removeTag } from "./tagsDisplay.js"; // On importe les fonctions pour gérer l'ajout et la suppression de tags
import { filterDropdown } from "../templates/dropdownTemplate.js"; // On importe la fonction pour filtrer les éléments du menu déroulant
import { updateCounter } from "./counter.js"; // On importe la fonction pour mettre à jour le compteur de recettes
import {addItemsToDropdown} from "../page/index.js"; // On importe la fonction pour ajouter des éléments au menu déroulant

// On utilise des objets pour garder les filtres actifs
// On utilise Set pour stocker les filtres actifs, garantissant ainsi l'unicité des éléments
export const activeFilters = {
  ingredients: new Set(),
  appliances: new Set(),
  ustensils: new Set(),
};

// Fonction de gestion de la recherche
export function handleSearch(event) {
  const query = event ? event.target.value.toLowerCase() : document.querySelector("#search-bar").value.toLowerCase();

  // On vérifie si la requête de recherche comporte au moins 3 caractères ou s'il y a des filtres actifs
  if (query.length >= 3 || hasActiveFilters()) { 
    const filteredRecipes = filterRecipes(query);
    updateDisplay(filteredRecipes);
  } else {
    // Affiche toutes les recettes si aucun filtre n'est actif et que la recherche est vide
    updateDisplay(recipes);
  }
}

// Fonction pour vérifier s'il y a des filtres actifs
export function hasActiveFilters() {
  return activeFilters.ingredients.size > 0 || activeFilters.appliances.size > 0 || activeFilters.ustensils.size > 0;
}

// Fonction de filtrage des recettes en fonction de la requête de recherche
export function filterRecipes(query) {
  console.log("Filtres actifs:", activeFilters);

  const filteredRecipes = [];
  const normalizedQuery = removeSpacesAndAccents(query);

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Normaliser les chaînes de caractères pour la comparaison
    const normalizedTitle = removeSpacesAndAccents(recipe.name);
    const normalizedDescription = removeSpacesAndAccents(recipe.description);
    const normalizedAppliance = removeSpacesAndAccents(recipe.appliance);

    // Vérifie si le titre de la recette correspond à la requête
    const titleMatch = normalizedTitle.includes(normalizedQuery);

    // Vérifie si l'un des ingrédients correspond à la requête
    let ingredientMatch = false;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const normalizedIngredient = removeSpacesAndAccents(recipe.ingredients[j].ingredient);
      if (normalizedIngredient.includes(normalizedQuery)) {
        ingredientMatch = true;
        break;
      }
    }

    // Vérifie si la description correspond à la requête
    const descriptionMatch = normalizedDescription.includes(normalizedQuery);

    // Vérifie si l'appareil utilisé correspond à la requête
    const applianceMatch = normalizedAppliance.includes(normalizedQuery);

    // Vérifie si l'un des ustensiles correspond à la requête
    let ustensilMatch = false;
    for (let k = 0; k < recipe.ustensils.length; k++) {
      const normalizedUstensil = removeSpacesAndAccents(recipe.ustensils[k]);
      if (normalizedUstensil.includes(normalizedQuery)) {
        ustensilMatch = true;
        break;
      }
    }

    // Vérifie si la recette correspond à l'une des conditions de recherche
    const matchesQuery = titleMatch || ingredientMatch || descriptionMatch || applianceMatch || ustensilMatch;

    // Vérifie si la recette correspond aux filtres actifs
    let matchesFilters = true;

    // Vérification des filtres d'ingrédients
    const activeIngredients = [...activeFilters.ingredients];
    for (let j = 0; j < activeIngredients.length; j++) {
      const filter = removeSpacesAndAccents(activeIngredients[j]);
      if (!recipe.ingredients.some(ingredient => removeSpacesAndAccents(ingredient.ingredient) === filter)) {
        matchesFilters = false;
        break;
      }
    }

    // Vérification des filtres d'appareils
    const activeAppliances = [...activeFilters.appliances];
    for (let j = 0; j < activeAppliances.length; j++) {
      const filter = removeSpacesAndAccents(activeAppliances[j]);
      if (removeSpacesAndAccents(recipe.appliance) !== filter) {
        matchesFilters = false;
        break;
      }
    }

    // Vérification des filtres d'ustensiles
    const activeUstensils = [...activeFilters.ustensils];
    for (let j = 0; j < activeUstensils.length; j++) {
      const filter = removeSpacesAndAccents(activeUstensils[j]);
      if (!recipe.ustensils.some(ustensil => removeSpacesAndAccents(ustensil) === filter)) {
        matchesFilters = false;
        break;
      }
    }

    // Ajoute la recette à la liste filtrée si elle correspond à la recherche et aux filtres
    if (matchesQuery && matchesFilters) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}


// Fonction de mise à jour de l'affichage des recettes
export function updateDisplay(filteredRecipes) {
  const recipeContainer = document.querySelector("#recipes-container");
  if (recipeContainer) {
    recipeContainer.innerHTML = "";
  }

  if (!Array.isArray(filteredRecipes)) {
    console.log("filteredRecipes doit être un tableau");
    return;
  }

  const cards = createRecipeCard(filteredRecipes);
  updateCounter();
  updateDropdowns(filteredRecipes);
}

// Fonction de mise à jour des listes déroulantes
function updateDropdowns(filteredRecipes) {
  const { ingredientsSet, appliancesSet, ustensilsSet } = extractUniqueItems(filteredRecipes);

  // Sauvegarde l'état des éléments sélectionnés
  const selectedItems = {
    ingredients: new Set([...document.querySelectorAll("#ingredients .dropdown-item.selected")].map(item => item.textContent.trim())),
    appliances: new Set([...document.querySelectorAll("#appliances .dropdown-item.selected")].map(item => item.textContent.trim())),
    ustensils: new Set([...document.querySelectorAll("#ustensils .dropdown-item.selected")].map(item => item.textContent.trim())),
  };

  updateDropdown("ingredients", ingredientsSet, selectedItems.ingredients);
  updateDropdown("appliances", appliancesSet, selectedItems.appliances);
  updateDropdown("ustensils", ustensilsSet, selectedItems.ustensils);
}

function updateDropdown(type, items, selectedItems) {
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
  searchInputDropdown.oninput = () => filterDropdown(searchInputDropdown, dropdownContent);

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

