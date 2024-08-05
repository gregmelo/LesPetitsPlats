import {recipes} from '../../data/recipes.js';

const recipesContainer = document.getElementById('recipes-container');

export function createRecipeCard(recipe) {
  const linkRecipeImage = './assets/recipes-img/';
  const card = document.createElement('div');
  card.className = 'recipe-card';

  const imageSrc = recipe.image ? `${linkRecipeImage}${recipe.image}` : `${linkRecipeImage}Recette01.jpg`;
  

  card.innerHTML = `
    <img src='${imageSrc}' alt="${recipe.name}">
    <div class="content">
      <h2>${recipe.name}</h2>
      <div class="recipe-info">
      <div class="recipe-description">
      <h3>recette</h3>
      <p>${recipe.description}</p>
      </div>
      <p class="time">${recipe.time} min</p>
      <div class="recipe-ingredients">
      <h3>Ingrédients</h3>
      <ul class="ingredients">
        ${(Array.isArray(recipe.ingredients) ? recipe.ingredients.map(ingredient => `
          <li>
            <span class="ingredient-name">${ingredient.ingredient}</span>
            <div class="ingredient-quantity">
              ${ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''}
            </div>
          </li>
        `).join('') : '<li>Aucun ingrédient trouvé.</li>')}
      </ul>
      </div>
      </div>
    </div>
  `;
  
  return card;
}


console.log(`Nombre de recettes : ${recipes.length}`);
recipes.forEach(recipe => {
  if (recipe) {
    const card = createRecipeCard(recipe);
    if (recipesContainer === null) {
      console.log('La page ne contient pas de recettes');
      return;
    }
    recipesContainer.appendChild(card);
  } else {
    console.log('Recette undefined trouvée');
  }
});

