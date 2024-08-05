export function setupOutsideClickHandler(dropdownContainer) {
  document.addEventListener('click', (event) => {
    const isClickInside = dropdownContainer.contains(event.target);

    if (!isClickInside) {
      const dropdowns = dropdownContainer.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('active')) {
          dropdown.classList.remove('active');
          const arrowImg = dropdown.querySelector('.dropdown-arrow');
          if (arrowImg) {
            arrowImg.src = "../../assets/icons/chevron_down.svg";
          }
          dropdown.style.borderRadius = '11px';
        }
      });
    }
  });
}
