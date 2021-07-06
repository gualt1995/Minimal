require('../css/project.css');

export default class project{
    constructor(){  
        var template = require("../templates/project.handlebars");

        var website = require('../data/tizio.json');
        var html = template(website)
        $('#project_description_web').html(html)

        var website = require('../data/martingale.json');
        var html = template(website)
        $('#project_description_martigale').html(html)

        var website = require('../data/k7.json');
        var html = template(website)
        $('#project_description_k7').html(html)

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