//@ts-nocheck
// script/utils/tagsDisplay.js

import { activeFilters, updateDisplay, filterRecipes } from "./search.js";
import { removeSpacesAndAccents } from "./removeSpacesAndAccents.js";

// Fonction pour ajouter un tag
export function addTag(text, type) {
  const tagsContainer = document.getElementById('tags-container');
  if (!tagsContainer) {
    console.log("Tags container not found");
    return;
  }

  console.log("Tags container:", tagsContainer); // Log pour vérifier le conteneur des tags
  // Créez un élément de tag
  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.id = `tag-${removeSpacesAndAccents(text)}`;
  tag.textContent = text;

  // Créez un élément SVG pour l'icône de suppression
  const removeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  removeIcon.setAttribute('class', 'remove-icon');
  removeIcon.setAttribute('width', '8');
  removeIcon.setAttribute('height', '8');
  removeIcon.setAttribute('viewBox', '0 0 8 8');
  removeIcon.setAttribute('fill', 'none');
  removeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M7 7L4 4M4 4L1 1M4 4L7 1M4 4L1 7');
  path.setAttribute('stroke', '#7A7A7A');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  removeIcon.appendChild(path);

  removeIcon.addEventListener('click', () => {
    tagsContainer.removeChild(tag); // Supprimer le tag de la vue
    deselectDropdownItem(text, type); // Désélectionner l'élément dans le dropdown
  });

  tag.appendChild(removeIcon);
  tagsContainer.appendChild(tag);

  console.log("Tag ajouté au DOM:", tag); // Log pour vérifier l'ajout du tag
  console.log("Tag visible:", tag.offsetParent !== null); // Log pour vérifier la visibilité du tag
  console.log("Contenu du conteneur des tags:", tagsContainer.innerHTML); // Log pour vérifier le contenu du conteneur des tags
}

// Fonction pour désélectionner un élément de dropdown
function deselectDropdownItem(text, type) {
  const dropdownContent = document.querySelector(`#${type} .dropdown-content`);
  if (dropdownContent) {
    const items = dropdownContent.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      console.log("item :", item);
      if (removeSpacesAndAccents(item.textContent.trim()) === removeSpacesAndAccents(text)) {
        console.log(`Removing 'selected' class from: ${item.textContent.trim()}`);
        item.classList.remove('selected');
        const clearIcon = item.querySelector('.clear-iconItems');
        if (clearIcon) {
          clearIcon.style.display = 'none';
        }
      }
    });
  }

  const filterSet = activeFilters[type];
  if (filterSet.has(removeSpacesAndAccents(text).toLowerCase())) {
    console.log(`Removing filter: ${text}`);
    filterSet.delete(removeSpacesAndAccents(text).toLowerCase());
  }

  const query = document.querySelector("#search-bar").value.toLowerCase();
  const filteredRecipes = filterRecipes(query);
  console.log(`Filtered recipes: ${filteredRecipes.length}`);
  updateDisplay(filteredRecipes);
}


// Fonction pour supprimer un tag
export function removeTag(tagId) {
  console.log("Tag à supprimer:", tagId); // Log pour vérifier l'ID du tag à supprimer
  const tagElement = document.getElementById(tagId);
  if (tagElement) {
    tagElement.remove();
  }
}

// Fonction pour supprimer tous les tags
export function removeAllTags() {
  const tagsContainer = document.getElementById('tags-container');
  if (tagsContainer) {
    // On supprime tous les enfants du conteneur des tags
    while (tagsContainer.firstChild) {
      tagsContainer.firstChild.remove();
    }
  } else {
    console.log("Le conteneur des tags n'a pas été trouvé");
  }
}