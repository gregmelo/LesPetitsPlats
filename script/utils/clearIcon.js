import { handleSearch } from './search.js'; // Importe la fonction handleSearch
import { removeAllTags } from './tagsDisplay.js';

export function setupClearIcon(inputElement, clearIconElement) {
  inputElement.addEventListener('input', function() {
    clearIconElement.style.display = inputElement.value ? 'block' : 'none';
  });

  clearIconElement.addEventListener('click', function() {
    inputElement.value = ''; // Vide le champ de recherche
    clearIconElement.style.display = 'none'; // Masque l'icône de suppression
    inputElement.focus(); // Reprend le focus sur le champ de recherche
    
    // Réinitialise la recherche
    handleSearch(); // Appelle handleSearch sans événement pour réinitialiser l'affichage
    removeAllTags(); // Supprime tous les tags
  });
}