import { addTag, removeTag } from './tagsDisplay.js';

export function setupHoverHandler(dropdownContent,  type) {
  dropdownContent.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.dropdown-item');
    if (clickedItem) {
      const itemText = clickedItem.textContent.trim();
      clickedItem.classList.toggle('selected');
      updateClearIconVisibility(clickedItem);

      if (clickedItem.classList.contains('selected')) {
        addTag(itemText, type);
      } else {
        removeTag(`tag-${type}-${itemText}`);
      }

    }
  });
}

// Fonction pour mettre à jour la visibilité de l'icône de suppression
function updateClearIconVisibility(item) {
  const clearIcon = item.querySelector('.clear-iconItems');
  if (clearIcon) {
    const isSelected = item.classList.contains('selected');
    clearIcon.style.display = isSelected ? 'block' : 'none';
  }
}


