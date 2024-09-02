// @ts-nocheck
import { activeFilters } from './search.js';

export function deselectAllDropdownItems() {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      item.classList.remove('selected');
      const clearIcon = item.querySelector('.clear-iconItems');
      if (clearIcon) {
        clearIcon.style.display = 'none';
      }
    });
  });

  // Vider les filtres actifs
  activeFilters.ingredients.clear();
  activeFilters.appliances.clear();
  activeFilters.ustensils.clear();
}