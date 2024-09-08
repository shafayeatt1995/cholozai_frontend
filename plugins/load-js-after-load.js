// plugins/load-js-after-load.js
window.onload = function () {
  // This runs after the page is fully loaded
  const scriptElements = document.querySelectorAll("script[src]");
  scriptElements.forEach((script) => {
    // Optionally, you can defer specific scripts
    script.defer = true;
  });
};
