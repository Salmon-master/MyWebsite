var cards = 10;

var cardsHTML = `
<div class="project-card" onclick="openProject()">
<h3>A Project</h3>
<p>
    A breif description of the project goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
</div>
`;

async function openProject() {
    console.log("Opening project...");
    var new_window = window.open("project_skeleton.html", "childname");
    console.log("New window opened:", new_window);
    new_window.postMessage("loadProject", "*");
    console.log("Message sent to new window to load project");
}

// Set the HTML for all elements with class 'project-grid'
var grids = document.getElementsByClassName('project-grid')[0].innerHTML = cardsHTML.repeat(cards);


// async function openProject() {
//     // gets and sets data on the project page
//     const content = await loadProjectText();
//     const projectContainer = document.getElementById("content");
//     if (projectContainer) {
//         projectContainer.innerHTML = content;
//     } else {
//         console.error("Project container not found");
//     }

    
// }

// async function loadPreview() {
//     // Gets and sets data for preview
// }

// async function loadProjectText() {
//     const setTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//     await setTimeout(1000);
//     return "Hello this is a project description loaded asynchronously.";
// }