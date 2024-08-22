// utils/extractUniqueItems.js

// Fonction pour extraire des éléments uniques (ingrédients, appareils, ustensiles) à partir d'une liste de recettes
export function extractUniqueItems(recipes) {
  // Initialisation des ensembles pour stocker les éléments uniques
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  // Parcours de chaque recette dans la liste des recettes
  recipes.forEach(recipe => {
    // Vérifie si la recette contient une liste d'ingrédients
    if (Array.isArray(recipe.ingredients)) {
      // Parcours de chaque ingrédient dans la liste des ingrédients
      recipe.ingredients.forEach(item => {
        // Ajoute l'ingrédient à l'ensemble des ingrédients s'il existe
        if (item.ingredient) {
          ingredientsSet.add(item.ingredient);
        }
      });
    }

    // Ajoute l'appareil à l'ensemble des appareils s'il existe
    if (recipe.appliance) {
      appliancesSet.add(recipe.appliance);
    }

    // Vérifie si la recette contient une liste d'ustensiles
    if (Array.isArray(recipe.ustensils)) {
      // Parcours de chaque ustensile dans la liste des ustensiles
      recipe.ustensils.forEach(ustensil => {
        // Ajoute l'ustensile à l'ensemble des ustensiles s'il existe
        if (ustensil) {
          ustensilsSet.add(ustensil);
        }
      });
    }
  });

  // Retourne les ensembles d'ingrédients, d'appareils et d'ustensiles uniques
  return { ingredientsSet, appliancesSet, ustensilsSet };
}

