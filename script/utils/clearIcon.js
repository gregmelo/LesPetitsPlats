export function setupClearIcon(inputElement, clearIconElement) {
  inputElement.addEventListener("input", function () {
    clearIconElement.style.display = inputElement.value ? "block" : "none";
  });

  clearIconElement.addEventListener("click", function () {
    inputElement.value = "";
    clearIconElement.style.display = "none";
    // Réinitialise les éléments du dropdown à leur état initial
    resetDropdownItems(inputElement);
    inputElement.focus();
  });
}

function resetDropdownItems(inputElement) {
  // Identifier le type de dropdown basé sur l'input
  const dropdownContent = inputElement.closest(".dropdown-content");
  if (!dropdownContent) return;

  // Afficher tous les items cachés dans le dropdown
  const items = dropdownContent.querySelectorAll(".dropdown-item");
  items.forEach((item) => {
    item.style.display = ""; // Réinitialiser le display
  });
}
