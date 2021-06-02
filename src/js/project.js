require('../css/project.css');

import anime from 'animejs/lib/anime.es.js';

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

        var typecolor = getComputedStyle(document.body).getPropertyValue('--type')
        var bgcolor = getComputedStyle(document.body).getPropertyValue('--background')

        $( ".project_link" ).on("mouseenter touchstart",(e) => {
            anime({
                targets:e.currentTarget.getElementsByTagName('svg')[0],
                easing: 'easeOutExpo',
                fill: bgcolor,
                duration: 300,
            });
            anime({
                targets: e.currentTarget,
                easing: 'easeOutExpo',
                color: bgcolor,
                duration: 300,
                background: typecolor,
            });
        })
        $( ".project_link" ).on("mouseleave touchmove click",(e) =>  {
            anime({
                targets: e.currentTarget,
                easing: 'easeInOutQuad',
                color: typecolor,
                duration: 300,
                background: bgcolor,
            });
            anime({
                targets:e.currentTarget.getElementsByTagName('svg')[0],
                easing: 'easeOutExpo',
                fill: typecolor,
                duration: 300,
            });
        })
    }
}