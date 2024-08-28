// Fonction pour assainir les entrées utilisateur
export function sanitizeInput(input) {
  // Limite la longueur de l'entrée pour éviter les attaques par injection
  if (input.length > 1000) {
    throw new Error('Input too long');
  }

  // Remplace les caractères < et > pour éviter les injections XSS
  const sanitized = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return sanitized;
}