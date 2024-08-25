//@ts-nocheck
// script/utils/tagsDisplay.js

import { handleSearch, activeFilters, updateDisplay, filterRecipes } from "./search.js";
import { removeSpacesAndAccents } from "./removeSpacesAndAccents.js";

// Fonction pour ajouter un tag
export function addTag(text, type) {
  const tagsContainer = document.getElementById('tags-container');
  if (!tagsContainer) {
    console.log("Tags container not found");
    return;
  }

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
    console.log("text pour deselectDropdownItem", text);
    console.log("type pour deselectDropdownItem", type);
    removeActiveFilter(type, text); // Supprimer le filtre actif
    console.log("text pour removeActiveFilter", text);
    console.log("type pour removeActiveFilter", type);
    handleSearch(); // Mettre à jour l'affichage des recettes
  });

  tag.appendChild(removeIcon);
  tagsContainer.appendChild(tag);
}

// Fonction pour désélectionner un élément de dropdown
function deselectDropdownItem(text, type) {
  console.log("text dans le deselectDropdownItem", text);
  console.log("type dans le deselectDropdownItem", type);
  const dropdownContent = document.querySelector(`#${type} .dropdown-content`);
  if (dropdownContent) {
    const items = dropdownContent.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      if (removeSpacesAndAccents(item.textContent.trim()) === removeSpacesAndAccents(text))
        console.log("item.textContent.trim() dans le deselectDropdownItem", item.textContent.trim());
      console.log("removeSpacesAndAccents(item.textContent.trim()) dans le deselectDropdownItem", removeSpacesAndAccents(item.textContent.trim()));
      console.log("removeSpacesAndAccents(text) dans le deselectDropdownItem", removeSpacesAndAccents(text));
        {
        item.classList.remove('selected');
        const clearIcon = item.querySelector('.clear-iconItems');
        if (clearIcon) {
          clearIcon.style.display = 'none';
        }
      }
    });
  }
}

// Fonction pour supprimer un filtre actif
function removeActiveFilter(type, text) {
  
  // Récupère l'ensemble des filtres actifs pour le type donné
  const filterSet = activeFilters[type];
  const normalizedText = removeSpacesAndAccents(text).toLowerCase(); // Normalisation
  console.log("Tentative de suppression du filtre:", normalizedText);
  
  // Vérifie si l'ensemble des filtres contient l'élément avec les espaces et accents supprimés
  if (filterSet.has(normalizedText)) {
    
    // Si l'élément est présent, le supprime de l'ensemble des filtres
    filterSet.delete(normalizedText);
    console.log("Filtre supprimé:", normalizedText);
  } else {
    console.log("Filtre non trouvé:", normalizedText);
  }
  console.log("État des filtres actifs après suppression:", activeFilters);
}


// Fonction pour supprimer un tag
export function removeTag(tagId) {
  const tagElement = document.getElementById(tagId);
  if (tagElement) {
    tagElement.remove();
  }
}

// Fonction pour supprimer tous les tags
export function removeAllTags() {
  const tagsContainer = document.getElementById('tags-container');
  if (tagsContainer) {
    while (tagsContainer.firstChild) {
      tagsContainer.firstChild.remove();
    }
  } else {
    console.log("Le conteneur des tags n'a pas été trouvé");
  }
}
