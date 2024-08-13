// @ts-nocheck

let numberOfRecipesCreated = 50;

export function createRecipeCard(recipes) {
  const linkRecipeImage = "./assets/recipes-img/";
  const recipesContainer = document.getElementById("recipes-container");

  if (!recipesContainer) {
    console.log("Le conteneur de recettes est introuvable");
    return 0;
  }

  // Ont s'assure que recipes est un tableau
  if (!Array.isArray(recipes)) {
    console.log("Le paramètre 'recipes' doit être un tableau");
    return;
  }

  if (recipes.length === 0) {
    const inputValue = document.querySelector("#search-bar").value.toLowerCase();
    console.log("Aucune recette à afficher");
    const noRecipe = document.createElement("h2");
    noRecipe.className = "no-recipe";
    noRecipe.textContent = `Aucune recette ne contient "${inputValue}". Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;

    recipesContainer.appendChild(noRecipe);
    return numberOfRecipesCreated = 0;
  }

  const cards = recipes.map((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const imageSrc = recipe.image
      ? `${linkRecipeImage}${recipe.image}`
      : `${linkRecipeImage}Recette01.jpg`;

    card.innerHTML = `
      <img src='${imageSrc}' alt="${recipe.name}">
      <div class="content">
        <h2>${recipe.name}</h2>
        <div class="recipe-info">
        <div class="recipe-description">
        <h3>Recette</h3>
        <p>${recipe.description}</p>
        </div>
        <p class="time">${recipe.time} min</p>
        <div class="recipe-ingredients">
        <h3>Ingrédients</h3>
        <ul class="ingredients">
          ${
            Array.isArray(recipe.ingredients)
              ? recipe.ingredients
                  .map(
                    (ingredient) => `
            <li>
              <span class="ingredient-name">${ingredient.ingredient}</span>
              <div class="ingredient-quantity">
                ${
                  ingredient.quantity
                    ? `${ingredient.quantity} ${ingredient.unit || ""}`
                    : ""
                }
              </div>
            </li>
          `
                  )
                  .join("")
              : "<li>Aucun ingrédient trouvé.</li>"
          }
        </ul>
        </div>
        </div>
      </div>
    `;

    return card;
  });
  console.log("Cartes de recettes créées:", cards);

    // Mettre à jour le nombre de recettes créées
    numberOfRecipesCreated = cards.length;

  // Ajoute les cartes au conteneur
  cards.forEach(card => {
    if (recipesContainer && card instanceof HTMLElement) {
      recipesContainer.appendChild(card);
    } else {
      console.log("Un élément retourné par createRecipeCard n'est pas un élément DOM :", card);
    }
  });

  console.log("Nombres de recettes:", numberOfRecipesCreated);

  // Retourner le nombre de recettes
  return numberOfRecipesCreated;
}

// Fonction pour obtenir le nombre de recettes créées
export function getNumberOfRecipesCreated() {
  return numberOfRecipesCreated;
}