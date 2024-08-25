// @ts-nocheck

import { setupClearIcon } from "../utils/clearIcon.js";
import { createCounter } from "../utils/counter.js";
import { setupHoverHandler } from "../utils/hoverHandler.js";
import { setupOutsideClickHandler } from "../utils/outsideClickHandler.js";
import { filterRecipes, updateDisplay } from "../utils/search.js";

export function dropdownTemplate() {
  const dropdownCounterContainer = document.getElementById(
    "dropdownCounter-container"
  );
  if (dropdownCounterContainer === null) {
    console.log("La page ne contient pas de dropdown");
    return;
  }
  dropdownCounterContainer.innerHTML = "";

  const dropdownContainer = document.createElement("div");
  dropdownContainer.className = "dropdown-container";
  dropdownCounterContainer.appendChild(dropdownContainer);

  // Appel de la fonction createCounter pour afficher le nombre de recettes
  createCounter(dropdownCounterContainer);

  // Création des conteneurs pour les dropdowns
  const ingredientsContainer = createDropdown("ingredients", "Ingrédients");
  const appliancesContainer = createDropdown("appliances", "Appareils");
  const utensilsContainer = createDropdown("ustensils", "Ustensiles");

  dropdownContainer.appendChild(ingredientsContainer);
  dropdownContainer.appendChild(appliancesContainer);
  dropdownContainer.appendChild(utensilsContainer);

  const dropdowns = [
    ingredientsContainer,
    appliancesContainer,
    utensilsContainer,
  ];

  // Initialise le gestionnaire de clics en dehors du dropdown
  setupOutsideClickHandler(dropdowns);

  return dropdownCounterContainer;
}

function createDropdown(id, placeholder) {
  const container = document.createElement("div");
  container.className = "dropdown";
  container.id = id;

  const button = document.createElement("button");
  button.className = "dropdown-button";
  button.innerHTML = `${placeholder} <span class="arrow-down"></span>`;

  const arrowImg = document.createElement("img");
  arrowImg.src = "./assets/icons/chevron_down.svg";
  arrowImg.alt = "Flèche de dropdown";
  arrowImg.className = "dropdown-arrow";

  const arrowDown = button.querySelector(".arrow-down");
  if (arrowDown !== null) {
    arrowDown.appendChild(arrowImg);
  }

  button.onclick = () => toggleDropdown(container, arrowImg);

  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";

  // Gère le survol des éléments de dropdown
  setupHoverHandler(dropdownContent, id);

  const formSearch = document.createElement("form");
  formSearch.className = "form-dropdown";

  const searchInputDropdown = document.createElement("input");
  searchInputDropdown.type = "text";
  searchInputDropdown.name = "searchDropdown";
  searchInputDropdown.className = "searchDropdown";
  searchInputDropdown.setAttribute("aria-label", placeholder);
  searchInputDropdown.placeholder = placeholder;
  searchInputDropdown.oninput = () =>
    filterDropdown(searchInputDropdown, dropdownContent);

  const searchIcon = document.createElement("img");
  searchIcon.src = "./assets/icons/Loop_CTA_grey.svg";
  searchIcon.className = "search-iconDropdown";
  searchIcon.alt = "Icône de recherche";

  const clearIconDropdown = document.createElement("img");
  clearIconDropdown.src = "./assets/icons/xmark_grey.svg";
  clearIconDropdown.className = "clear-iconDropdown";
  clearIconDropdown.alt = "Icône de suppression";
  clearIconDropdown.style.display = "none";

  formSearch.appendChild(searchInputDropdown);
  formSearch.appendChild(clearIconDropdown);
  formSearch.appendChild(searchIcon);
  dropdownContent.appendChild(formSearch);
  container.appendChild(button);
  container.appendChild(dropdownContent);

  // Ajout des événements pour afficher/cacher l'icône de suppression
  searchInputDropdown.addEventListener("input", () => {
    setupClearIcon(searchInputDropdown, clearIconDropdown);
  });

  return container;
}


function toggleDropdown(container, arrowImg) {
  container.classList.toggle("active");

  if (container.classList.contains("active")) {
    arrowImg.src = "./assets/icons/chevron_up.svg"; // Changement de l'icône lorsque le dropdown est actif
    container.style.borderRadius = "11px 11px 0 0";
  } else {
    arrowImg.src = "./assets/icons/chevron_down.svg"; // Réinitialisation de l'icône lorsque le dropdown est inactif
    container.style.borderRadius = "11px";
  }
}

export function filterDropdown(input, dropdownContent) {
  const filter = input.value.toLowerCase();
  const items = dropdownContent.querySelectorAll(".dropdown-item");
  
  items.forEach((item) => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(filter) ? "" : "none";
  });
}

