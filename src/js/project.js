require('../css/project.css');

export default class project{
    constructor(){  
        var template = require("../templates/project.handlebars");

        var website = require('../data/projects.json');
        var html = template(website[0])
        $('#project_description_onair').html(html)
        html = template(website[1])
        $('#project_description_martigale').html(html)
        html = template(website[2])
        $('#project_description_web').html(html)

        this.typecolor = getComputedStyle(document.body).getPropertyValue('--type')
        this.bgcolor = getComputedStyle(document.body).getPropertyValue('--background')

        $( ".project_link" ).on("mouseenter touchstart",(e) => {
            this.getThemeColors();
            e.currentTarget.getElementsByTagName('svg')[0].style.fill="var(--background)"
            e.currentTarget.style.color="var(--background)"
            e.currentTarget.style.background="var(--type)"
        })
        $( ".project_link" ).on("mouseleave touchmove click",(e) =>  {
            this.getThemeColors();
            e.currentTarget.style.color=""
            e.currentTarget.style.background=""
            e.currentTarget.getElementsByTagName('svg')[0].style.fill=""
        })
    }

    getThemeColors(){
        this.typecolor = getComputedStyle(document.body).getPropertyValue('--type')
        this.bgcolor = getComputedStyle(document.body).getPropertyValue('--background')
    }
}