fetch('./components/header.html') // Path must match the directory structure
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
  });

fetch('./components/footer.html') // Same applies here
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  });