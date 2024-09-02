// export function removeSpacesAndAccents(str) {
//   // Supprimer les espaces
//   str = str.replace(/\s+/g, '');

//   // Supprimer les accents
//   str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//   return str;
// }

export function removeSpacesAndAccents(str) {
  // Ne supprimez plus les espaces, seulement les accents
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}