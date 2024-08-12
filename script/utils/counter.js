import { getNumberOfRecipesCreated } from '../templates/recipesCardTemplate.js'; // Importer la fonction pour obtenir le nombre de recettes créées

export function createCounter(dropdownCounterContainer) {
  if (!dropdownCounterContainer) {
    console.log('La page ne contient pas de conteneur pour le compteur de recettes');
    return;
  }

  // Créer les cartes de recettes et obtenir le nombre de recettes
  const recipeCount = getNumberOfRecipesCreated();
  console.log("recipeCount :", recipeCount);

  //élément pour afficher le nombre de recettes
  const counterElement = document.createElement('div');
  counterElement.className = 'recipe-counter';
  counterElement.textContent = `${recipeCount} recette(s)`;

  // Ajoute l'élément au conteneur
  dropdownCounterContainer.appendChild(counterElement);
}

export function updateCounter() {
  const counterElement = document.querySelector('.recipe-counter');
  if (counterElement) {
    const recipeCount = getNumberOfRecipesCreated();
    counterElement.textContent = `${recipeCount} recette(s)`;
  }
}