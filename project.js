

const cardsHTML = `
<div class="project-card" onclick="openProject()">
<h3>A Project</h3>
<p>
    A breif description of the project goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
</div>
`;

class ClassName {
  constructor(name) {
    this.name = name;
  }
}

async function openProject() {
    var params = new URLSearchParams();
    params.append("message", "hello World");
    var url = "project_skeleton.html?" + params.toString();
    var new_window = window.open(url, "_self");

}

// Set the HTML for all elements with class 'project-grid'
// var grids = document.getElementsByClassName('project-grid')[0].innerHTML = cardsHTML.repeat(cards);