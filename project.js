var cards = 10;

var cardsHTML = `
<div class="project-card">
<h3>A Project</h3>
<p>
    A breif description of the project goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
</div>
`;

// Set the HTML for all elements with class 'project-grid'
var grids = document.getElementsByClassName('project-grid')[0].innerHTML = cardsHTML.repeat(cards);
