export function setupHoverHandler(dropdownContent) {
  dropdownContent.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.dropdown-item');
    if (clickedItem) {
      clickedItem.classList.toggle('selected');
      updateClearIconVisibility(clickedItem);
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


