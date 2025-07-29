import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'
import metadata_block from 'https://cdn.jsdelivr.net/npm/markdown-it-metadata-block@1.0.6/+esm'
import yaml from 'https://cdn.jsdelivr.net/npm/yaml@2.8.0/+esm'

class Project {
    constructor(string) {
        var filePath = `./projects/${string}.md`
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
            result = xmlhttp.responseText;
        }


        const meta = {} // may be pre-populated with defaults
        const markdown = markdownIt().use(metadata_block, {
            parseMetadata: yaml.parse,
            meta
        })
        this.page = markdown.render(result);
        this.meta = meta;
    }
}

export default Project;