function setLanguage() {
  const language = document.getElementById("language").value;
  fetch(`./assets/JSON/Home/${language}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translations[key];
      });
    })
    .catch(error => console.error('Error loading translations:', error));
}


