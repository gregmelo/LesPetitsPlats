import { handleSearch, filterRecipes, updateDisplay} from './search.js'; // Importe la fonction handleSearch
import { removeAllTags } from './tagsDisplay.js';
import { deselectAllDropdownItems } from './deselectDropdown.js';

export function setupClearIcon(inputElement, clearIconElement) {
  inputElement.addEventListener('input', function() {
    clearIconElement.style.display = inputElement.value ? 'block' : 'none';
  });

  clearIconElement.addEventListener('click', function() {
    inputElement.value = ''; // Vide le champ de recherche
    clearIconElement.style.display = 'none'; // Masque l'icône de suppression
    inputElement.focus(); // Reprend le focus sur le champ de recherche
    
    // Réinitialise la recherche mais en tenant compte des filtres actifs
    const filteredRecipes = filterRecipes(''); // Appelle filterRecipes avec une chaîne vide pour filtrer uniquement en fonction des dropdowns
    updateDisplay(filteredRecipes); // Met à jour l'affichage des recettes et des dropdowns
  });
}

export function setupReinitIcon(inputElement, reinitIconElement, clearIconElement) {
  inputElement.addEventListener('input', function() {
    reinitIconElement.style.display = inputElement.value ? 'block' : 'none';
  });

  reinitIconElement.addEventListener('click', function() {
    inputElement.value = ''; // Vide le champ de recherche
    removeAllTags(); // Supprime tous les tags
    deselectAllDropdownItems(); // Désélectionne tous les éléments des dropdowns
    clearIconElement.style.display = 'none'; // Masque l'icône de suppression
    reinitIconElement.style.display = 'none'; // Masque l'icône de réinitialisation
    handleSearch(); // Appelle handleSearch sans événement pour réinitialiser l'affichage
  });
}