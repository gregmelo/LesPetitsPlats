import { recipes } from '../../data/recipes.js'; // Importation du fichier de recettes

export function createCounter(dropdownCounterContainer) {
  if (!dropdownCounterContainer) {
    console.log('La page ne contient pas de conteneur pour le compteur de recettes');
    return;
  }

  // le nombre de recettes
  const recipeCount = recipes.length;

  //élément pour afficher le nombre de recettes
  const counterElement = document.createElement('div');
  counterElement.className = 'recipe-counter';
  counterElement.textContent = `${recipeCount} recette(s)`;

  // Ajoute l'élément au conteneur
  dropdownCounterContainer.appendChild(counterElement);
}
