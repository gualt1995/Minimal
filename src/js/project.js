require('../css/project.css');

export default class project{
    constructor(){  
        var template = require("../templates/project.handlebars");
        var website = require('../data/projects.json');
        var html = template(website)
        $('.works_frame').html(html)
        
    }

}