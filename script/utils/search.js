// @ts-nocheck

import { recipes } from "../../data/recipes.js"; // On importe les recettes depuis un fichier de données
import { createRecipeCard } from "../templates/recipesCardTemplate.js"; // On importe la fonction pour créer des cartes de recettes
import { extractUniqueItems } from "./extractUniqueItems.js"; // On importe la fonction pour extraire les éléments uniques (ingrédients, appareils, ustensiles)
import { removeSpacesAndAccents } from "./removeSpacesAndAccents.js"; // On importe la fonction pour normaliser les chaînes de caractères
import { addTag, removeTag } from "./tagsDisplay.js"; // On importe les fonctions pour gérer l'ajout et la suppression de tags
import { filterDropdown } from "../templates/dropdownTemplate.js"; // On importe la fonction pour filtrer les éléments du menu déroulant
import { updateCounter } from "./counter.js"; // On importe la fonction pour mettre à jour le compteur de recettes

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
  const query = event ? event.target.value.toLowerCase() : document.querySelector("#search-bar").value.toLowerCase();

  // On vérifie si la requête de recherche comporte au moins 3 caractères
  if (query.length >= 3) {
    // On filtre les recettes en fonction de la requête de recherche
    const filteredRecipes = filterRecipes(query);
    // On met à jour l'affichage avec les recettes filtrées
    updateDisplay(filteredRecipes);
  } else {
    // Si la requête est trop courte, on affiche toutes les recettes
    updateDisplay(recipes);
  }
}

// Fonction de filtrage des recettes en fonction de la requête de recherche
export function filterRecipes(query) {
  console.log("Filtres actifs:", activeFilters);
  return recipes.filter((recipe) => {
    // Vérifie si le titre de la recette correspond à la requête
    const titleMatch = recipe.name.toLowerCase().includes(query);
    // Vérifie si l'un des ingrédients correspond à la requête
    const ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query)
    );
    // Vérifie si la description correspond à la requête
    const descriptionMatch = recipe.description.toLowerCase().includes(query);
    // Vérifie si l'appareil utilisé correspond à la requête
    const applianceMatch = recipe.appliance.toLowerCase().includes(query);
    // Vérifie si l'un des ustensiles correspond à la requête
    const ustensilMatch = recipe.ustensils.some((ustensil) =>
      ustensil.toLowerCase().includes(query)
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
          (ingredient) => ingredient.ingredient.toLowerCase() === filter
        )
      ) &&
      [...activeFilters.appliances].every(
        (filter) => recipe.appliance.toLowerCase() === filter
      ) &&
      [...activeFilters.ustensils].every((filter) =>
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === filter)
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
  // On extrait les éléments uniques (ingrédients, appareils, ustensiles) des recettes filtrées
  const { ingredientsSet, appliancesSet, ustensilsSet } =
    extractUniqueItems(filteredRecipes);

  // On met à jour chaque liste déroulante avec les éléments extraits
  updateDropdown("ingredients", ingredientsSet);
  updateDropdown("appliances", appliancesSet);
  updateDropdown("ustensils", ustensilsSet);
}

function updateDropdown(type, items) {
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
  // On parcourt chaque élément à ajouter au menu déroulant
  items.forEach((item) => {
    // On crée un nouvel élément de menu déroulant
    const option = document.createElement("div");
    option.className = "dropdown-item";
    option.setAttribute("id", `item-${removeSpacesAndAccents(item)}`);
    option.textContent = item;

    // On vérifie si l'élément fait partie des filtres actifs
    if (activeFilters[type].has(item.toLowerCase())) {
      option.classList.add("selected");
    }

    // On crée une icône de suppression pour l'élément du menu déroulant
    const clearItem = document.createElement("img");
    clearItem.src = "./assets/icons/xmark_item.svg";
    clearItem.className = "clear-iconItems";
    clearItem.alt = "Icône de suppression";
    // On affiche ou masque l'icône de suppression en fonction de l'état de sélection
    clearItem.style.display = option.classList.contains("selected")
      ? "block"
      : "none";

    // On ajoute un écouteur d'événement pour la suppression d'un tag
    clearItem.addEventListener("click", (event) => {
      console.log("je suis dans le clearItem");
      console.log("option:", option);
      // event.stopPropagation(); // On empêche la propagation de l'événement pour éviter des actions indésirables
      option.classList.remove("selected"); // On retire la classe 'selected'
      clearItem.style.display = "none"; // On masque l'icône de suppression
      removeTag(`tag-${removeSpacesAndAccents(item)}`); // On supprime le tag correspondant
      // On met à jour l'affichage avec les recettes filtrées
      updateDisplay(
        filterRecipes(document.querySelector("#search-bar").value.toLowerCase())
      );
      console.log("Tag supprimé:", item); // Log pour vérifier la suppression du tag
    });

    option.appendChild(clearItem);

    // On ajoute un écouteur d'événement pour la sélection d'un élément
    option.addEventListener("click", (event) => {
      event.stopPropagation(); // On empêche la propagation du clic
      if (activeFilters[type].has(item.toLowerCase())) {
        console.log("je suis dans le if");
        console.log("option:", option);
        activeFilters[type].delete(item.toLowerCase()); // On supprime l'élément des filtres actifs
        option.classList.remove("selected"); // On retire la classe 'selected'
        clearItem.style.display = "none"; // On masque l'icône de suppression
        removeTag(`tag-${removeSpacesAndAccents(item)}`); // On supprime le tag du DOM
      } else {
        console.log("je suis dans le else");
        console.log("Active Filters:", activeFilters);
        console.log("Active Filters (Array):", [...activeFilters[type]]);
        console.log("item:", item);
        console.log("type:", type);
    
        option.classList.add("selected"); // On ajoute la classe 'selected'
        clearItem.style.display = "block"; // On affiche l'icône de suppression
        activeFilters[type].add(item.toLowerCase()); // On ajoute l'élément aux filtres actifs
        addTag(item, type); // On ajoute le tag au DOM ici
        console.log("Tag ajouté:", item); // Log pour vérifier l'ajout du tag
      }
    
      // On met à jour l'affichage avec les recettes filtrées
      updateDisplay(
        filterRecipes(document.querySelector("#search-bar").value.toLowerCase())
      );
    });
    
    

    // On ajoute l'option créée au contenu du menu déroulant
    dropdownContent.appendChild(option);
  });
}