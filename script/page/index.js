import { recipes } from "../../data/recipes.js";
import { dropdownTemplate } from "../templates/dropdownTemplate.js";
import { headerTemplate } from "../templates/headerTemplate.js";
import { createRecipeCard } from "../templates/recipesCardTemplate.js";
import { extractUniqueItems } from "../utils/extractUniqueItems.js";
import { setupHoverHandler } from "../utils/hoverHandler.js";
import { removeSpacesAndAccents } from "../utils/removeSpacesAndAccents.js";
import { activeFilters, handleSearch } from "../utils/search.js";
import { addTag, removeTag } from "../utils/tagsDisplay.js";

document.addEventListener('DOMContentLoaded', () => {
  headerTemplate();
  dropdownTemplate();
  populateDropdown(recipes);
  createRecipeCard(recipes);
  
  const searchInput = document.querySelector('#search-bar');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
});

function populateDropdown(recipes) {
  const { ingredientsSet, appliancesSet, ustensilsSet } = extractUniqueItems(recipes);
  addItemsToDropdown('ingredients', ingredientsSet);
  addItemsToDropdown('appliances', appliancesSet);
  addItemsToDropdown('ustensils', ustensilsSet);
}

export function addItemsToDropdown(type, items) {
  const dropdownContent = document.querySelector(`#${type} .dropdown-content`);
  items.forEach((item) => {
    const option = document.createElement("div");
    option.className = "dropdown-item";
    option.setAttribute("id", `item-${removeSpacesAndAccents(item)}`);
    option.textContent = item;

    const clearItem = document.createElement("img");
    clearItem.src = "./assets/icons/xmark_item.svg";
    clearItem.className = "clear-iconItems";
    clearItem.alt = "Icône de suppression";
    clearItem.style.display = "none";

    option.addEventListener("click", (event) => {
      event.stopPropagation();
      const normalizedItem = removeSpacesAndAccents(item).toLowerCase();
      
      if (option.classList.contains("selected")) {
        option.classList.remove("selected");
        clearItem.style.display = "none";
        removeTag(`tag-${normalizedItem}`);
        activeFilters[type].delete(normalizedItem);
      } else {
        option.classList.add("selected");
        clearItem.style.display = "block";
        setupHoverHandler(dropdownContent, type);
        addTag(item, type);
        activeFilters[type].add(normalizedItem);
      }
    
      console.log("Active filters after click:", activeFilters);
      handleSearch();
    });

    clearItem.addEventListener("click", (event) => {
      event.stopPropagation();
      option.classList.remove("selected");
      clearItem.style.display = "none";
      removeTag(`tag-${removeSpacesAndAccents(item)}`);
      activeFilters[type].delete(item.toLowerCase());
      handleSearch(); 
    });

    option.appendChild(clearItem);

    if (dropdownContent) {
      dropdownContent.appendChild(option);
    }
  });
}
