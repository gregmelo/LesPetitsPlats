// utils/extractUniqueItems.js

export function extractUniqueItems(recipes) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipes.forEach(recipe => {
    if (Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(item => {
        if (item.ingredient) {
          ingredientsSet.add(item.ingredient);
        }
      });
    }

    if (recipe.appliance) {
      appliancesSet.add(recipe.appliance);
    }

    if (Array.isArray(recipe.ustensils)) {
      recipe.ustensils.forEach(ustensil => {
        if (ustensil) {
          ustensilsSet.add(ustensil);
        }
      });
    }
  });
  return { ingredientsSet, appliancesSet, ustensilsSet };
}
