// @ts-nocheck
// script/utils/tagsDisplay.js
export function addTag(text, type) {
  const tagsContainer = document.getElementById('tags-container');
  if (!tagsContainer) return;

  // Créez un élément de tag
  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.id = `tag-${type}-${text}`;
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
}


function deselectDropdownItem(text, type) {
  // Sélectionne le contenu du dropdown correspondant
  const dropdownContent = document.querySelector(`#${type} .dropdown-content`);
  if (dropdownContent) {
    // Trouve l'élément de dropdown correspondant au texte
    const items = dropdownContent.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      if (item.textContent.trim() === text) {
        item.classList.remove('selected');
        const clearIcon = item.querySelector('.clear-iconItems');
        if (clearIcon) {
          clearIcon.style.display = 'none';
        }
      }
    });
  }
}

// Fonction pour supprimer un tag
export function removeTag(tagId) {
  const tagElement = document.getElementById(tagId);
  if (tagElement) {
    tagElement.remove();
  }
}
