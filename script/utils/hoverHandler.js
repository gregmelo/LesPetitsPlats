export function setupHoverHandler(dropdownContent) {
  dropdownContent.addEventListener('click', (event) => {
    const clickedItem = event.target.closest('.dropdown-item');
    if (clickedItem) {
      clickedItem.classList.toggle('selected');
      updateClearIconVisibility(dropdownContent);
    }
  });

  const clearIcon = dropdownContent.querySelector('.clear-iconItems');
  if (clearIcon) {
    clearIcon.addEventListener('click', () => {
      dropdownContent.querySelectorAll('.dropdown-item.selected').forEach(item => {
        item.classList.remove('selected');
      });
      updateClearIconVisibility(dropdownContent);
    });
  }
}

function updateClearIconVisibility(dropdownContent) {
  const clearIcon = dropdownContent.querySelector('.clear-iconItems');
  if (clearIcon) {
    const hasSelectedItems = dropdownContent.querySelectorAll('.dropdown-item.selected').length > 0;
    clearIcon.style.display = hasSelectedItems ? 'block' : 'none';
  }
}

