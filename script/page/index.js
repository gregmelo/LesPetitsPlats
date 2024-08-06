import { headerTemplate } from "../templates/headerTemplate.js";
import { dropdownTemplate } from "../templates/dropdownTemplate.js";
import { createRecipeCard } from "../templates/recipesCardTemplate.js";
import { recipes } from "../../data/recipes.js";
import { removeSpacesAndAccents } from "../utils/removeSpacesAndAccents.js";

document.addEventListener('DOMContentLoaded', () => {
  headerTemplate();
  dropdownTemplate();
  populateDropdown(recipes);
  createRecipeCard(recipes);
});

function extractUniqueItems(recipes) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipes.forEach(recipe => {
    if (Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(item => {
        if (item.ingredient) {
          ingredientsSet.add(item.ingredient);
        }
      });
    }

    if (recipe.appliance) {
      appliancesSet.add(recipe.appliance);
    }

    if (Array.isArray(recipe.ustensils)) {
      recipe.ustensils.forEach(ustensil => {
        if (ustensil) {
          ustensilsSet.add(ustensil);
        }
      });
    }
  });
  return { ingredientsSet, appliancesSet, ustensilsSet };
}

function populateDropdown(recipes) {
  const { ingredientsSet, appliancesSet, ustensilsSet } = extractUniqueItems(recipes);
  addItemsToDropdown('ingredients', ingredientsSet);
  addItemsToDropdown('appliances', appliancesSet);
  addItemsToDropdown('ustensils', ustensilsSet);
}

function addItemsToDropdown(type, items) {
  const dropdownContent = document.querySelector(`#${type} .dropdown-content`);
  items.forEach(item => {
    const option = document.createElement('div');
    option.className = 'dropdown-item';
    option.setAttribute('id', `item-${removeSpacesAndAccents(item)}`);
    option.textContent = item;
    
    if (dropdownContent) {
      dropdownContent.appendChild(option);
    }

    const clearItem = document.createElement('img');
    clearItem.src = './assets/icons/xmark_item.svg';
    clearItem.className = 'clear-iconItems';
    clearItem.alt = 'Icône de suppression';
    clearItem.style.display = 'none';

    clearItem.addEventListener('click', (event) => {
      event.stopPropagation();
      option.classList.remove('selected');
      clearItem.style.display = 'none';
    });

    option.appendChild(clearItem);
  });
}


