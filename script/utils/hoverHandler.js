import { addTag, removeTag } from './tagsDisplay.js';

export function setupHoverHandler(dropdownContent, type) {
  // On ajoute un écouteur d'événements pour détecter les clics sur les éléments du menu déroulant
  dropdownContent.addEventListener('click', (event) => {
    // On recherche l'élément parent le plus proche ayant la classe 'dropdown-item'
    const clickedItem = event.target.closest('.dropdown-item');
    console.log("clickedItem", clickedItem);
    
    // On vérifie que l'élément cliqué existe bien
    if (clickedItem) {
      // On récupère le texte de l'élément cliqué et on le nettoie des espaces inutiles
      const itemText = clickedItem.textContent.trim();
      console.log("itemText", itemText);
      
      // On bascule l'état de sélection de l'élément cliqué
      clickedItem.classList.add('selected');
      
      // On met à jour la visibilité de l'icône de suppression en fonction de l'état de sélection
      updateClearIconVisibility(clickedItem);

      // On vérifie si l'élément est maintenant sélectionné
      if (clickedItem.classList.contains('selected')) {
        console.log("je suis dans le if de setupHoverHandler");
        // On ajoute un tag avec le texte de l'élément et le type spécifié
        addTag(itemText, type);
      } else {
        console.log("je suis dans le else de setupHoverHandler");
        // On supprime le tag correspondant au texte de l'élément
        removeTag(`tag-${itemText}`);
      }
    }
  });
}

// Fonction pour mettre à jour la visibilité de l'icône de suppression
function updateClearIconVisibility(item) {
  // On recherche l'icône de suppression à l'intérieur de l'élément
  const clearIcon = item.querySelector('.clear-iconItems');
  
  // On vérifie que l'icône de suppression existe
  if (clearIcon) {
    // On vérifie si l'élément est sélectionné
    const isSelected = item.classList.contains('selected');
    
    // On affiche ou masque l'icône de suppression en fonction de l'état de sélection
    clearIcon.style.display = isSelected ? 'block' : 'none';
  }
}



