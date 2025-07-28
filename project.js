import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'
import metadata_block from 'https://cdn.jsdelivr.net/npm/markdown-it-metadata-block@1.0.6/+esm'
import yaml from 'https://cdn.jsdelivr.net/npm/yaml@2.8.0/+esm'

function openProject(index) {
    var params = new URLSearchParams();
    params.append("message", projects[index].page);
    var url = "project_skeleton.html?" + params.toString();
    var new_window = window.open(url, "_self");

}


var test_string = `---
title: My Project
description: This is a test project lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
date: 7/28/2025
...
## My Project
my project is a test project that does something interesting. it is reeally cool and I like it a lot. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
<https://www.markdownguide.org>
### A subheading
lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![The San Juan Mountains are beautiful!](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "San Juan Mountains")

lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`
console.log(FileList.)


class ClassName {
    constructor(name, string) {
        const meta = {} // may be pre-populated with defaults
        const markdown = markdownIt().use(metadata_block, {
            parseMetadata: yaml.parse,
            meta
        })
        this.name = name;
        this.page = markdown.render(string);
        this.meta = meta;
    }
}

var projects = [new ClassName("Test Project", test_string)];

var cardshtml = ""

for (let index = 0; index < projects.length; index++) {
    const element = projects[index];
    console.log(element);
    cardshtml += `
<div class="project-card" onclick="openProject(${element.name})">
<h3>${element.meta.title}</h3>
<p>
   ${element.meta.description}
</p>
</div>
`;
}
var dummyCard = `
<div class="project-card" onclick="openProject(1)">
<h3>Lorme</h3>
<p>
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
</div>
`

cardshtml += dummyCard.repeat(10)
var grids = document.getElementsByClassName('project-grid')[0].innerHTML = cardshtml;
// Set the HTML for all elements with class 'project-grid'
// var grids = document.getElementsByClassName('project-grid')[0].innerHTML = cardsHTML.repeat(cards);

window.openProject = openProject; // Expose the function to the global scope