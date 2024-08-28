import { setupClearIcon, setupReinitIcon } from "../utils/clearIcon.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";

export function headerTemplate() {
  const headerTemplate = document.getElementById("header");
  if (headerTemplate === null) {
    console.log("La page ne contient pas de header");
    return;
  }
  headerTemplate.textContent = "";

  const logoHeader = document.createElement("img");
  logoHeader.src = "./assets/logo/Logo.svg";
  logoHeader.className = "logo";
  logoHeader.alt = "Logo de l'entreprise Les Petits Plats";
  logoHeader.ariaDescription = "Logo de l'entreprise Les Petits Plats";

  const titleSearchContainer = document.createElement("div");
  titleSearchContainer.className = "titleSearch-container";

  const titleHeader = document.createElement("h1");
  titleHeader.className = "title";

  // On crée plusieurs éléments de texte pour simuler des lignes séparées
  const line1 = document.createElement("span");
  line1.textContent = "CHERCHEZ PARMI PLUS DE 1500 RECETTES";

  const line2 = document.createElement("span");
  line2.textContent = "DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";

  // Ajoute les éléments au conteneur titre
  titleHeader.appendChild(line1);
  titleHeader.appendChild(document.createElement("br"));
  titleHeader.appendChild(line2);
  const formContainer = document.createElement("form");
  formContainer.className = "form-container";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.name = "search";
  searchInput.id = "search-bar";
  searchInput.className = "search";
  searchInput.placeholder = "Recherchez une recette, un ingrédient ...";
  searchInput.ariaLabel = "Recherchez une recette, un ingrédient ...";
  searchInput.ariaPlaceholder = "Recherchez une recette, un ingrédient ...";

  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.id = "search-button";

  const searchIcon = document.createElement("img");
  searchIcon.src = "./assets/icons/loop_cta_black.svg";
  searchIcon.className = "search-icon";
  searchIcon.alt = "Icone de recherche";

  const clearIcon = document.createElement("img");
  clearIcon.src = "./assets/icons/xmark_grey.svg";
  clearIcon.className = "clear-icon";
  clearIcon.alt = "Icône de suppression";
  clearIcon.style.display = "none";

  const reinitIcon = document.createElement("img");
  reinitIcon.src = "./assets/icons/arrow-rotate-left.svg";
  reinitIcon.className = "reinit";
  reinitIcon.alt = "Icône de réinitialisation de la recherche";
  reinitIcon.style.display = "none";

  // headerTemplate.appendChild(bgcHeader)
  headerTemplate.appendChild(logoHeader);
  headerTemplate.appendChild(titleSearchContainer);
  titleSearchContainer.appendChild(titleHeader);
  titleSearchContainer.appendChild(formContainer);
  formContainer.appendChild(searchInput);
  formContainer.appendChild(clearIcon);
  formContainer.appendChild(reinitIcon);
  formContainer.appendChild(searchButton);
  searchButton.appendChild(searchIcon);

  // Ajout d'un événement pour gérer l'affichage des icônes et l'assainissement de l'input
  searchInput.addEventListener("input", function () {
    // Récupérer la valeur actuelle de l'input
    const userInput = searchInput.value;

    // Assainir l'entrée utilisateur pour éviter les injections XSS
    const safeInput = sanitizeInput(userInput);

    // Mettre à jour la valeur de l'input avec l'entrée assainie
    searchInput.value = safeInput;

    // Appeler les fonctions pour afficher ou cacher les icônes de suppression et de réinitialisation
    setupClearIcon(searchInput, clearIcon);
    setupReinitIcon(searchInput, reinitIcon, clearIcon);
  });

  // Liens des images pour les états normal et hover
  const normalIcon = "assets/icons/loop_cta_black.svg";
  const hoverIcon = "assets/icons/loop_cta_yellow.svg";

  // événements de survol et de sortie
  searchIcon.addEventListener("mouseover", function () {
    searchIcon.src = hoverIcon;
  });

  searchIcon.addEventListener("mouseout", function () {
    searchIcon.src = normalIcon;
  });

  return headerTemplate;
}
