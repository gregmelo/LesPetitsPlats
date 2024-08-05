// Fonction exportée pour configurer un gestionnaire de clics en dehors des dropdowns
export function setupOutsideClickHandler(dropdowns) {
  // Ajoute un écouteur d'événements pour les clics sur tout le document
  document.addEventListener('click', (event) => {
    let isClickInside = false;

    dropdowns.forEach(dropdown => {
      if (dropdown.contains(event.target)) {
        isClickInside = true;
      }
    });

    if (!isClickInside) {
      closeAllDropdowns(dropdowns);
    }
  });

  // Ajoute un écouteur d'événements pour chaque dropdown
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (event) => {
      event.stopPropagation(); // Empêche le clic de se propager à l'événement de document

      // Ferme les autres dropdowns
      closeAllDropdowns(dropdowns, dropdown);
    });
  });
}

// Fonction pour fermer tous les dropdowns sauf un optionnellement exclu
function closeAllDropdowns(dropdowns, excludeDropdown = null) {
  dropdowns.forEach(dropdown => {
    if (dropdown !== excludeDropdown && dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
      const arrowImg = dropdown.querySelector('.dropdown-arrow');
      if (arrowImg) {
        arrowImg.src = "../../assets/icons/chevron_down.svg";
      }
      dropdown.style.borderRadius = '11px';
    }
  });
}
