export function setupClearIcon(inputElement, clearIconElement) {
  inputElement.addEventListener('input', function() {
    clearIconElement.style.display = inputElement.value ? 'block' : 'none';
  });

  clearIconElement.addEventListener('click', function() {
    inputElement.value = '';
    clearIconElement.style.display = 'none';
    inputElement.focus();
  });
}
