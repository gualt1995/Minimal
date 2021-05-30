require('../css/project.css');

import anime from 'animejs/lib/anime.es.js';
import arrow from '../assets/arrow_link.svg';

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
        
        anime({
            targets: ".project_link",
            duration: 1,
            background: "linear-gradient(to right, var(--type) 0%, var(--background) 0%)",
        });

        $(".project_link_icon").attr("src", arrow);

        $( ".project_link" ).on("mouseenter touchstart",function(e) {
            //do note use variavbles for colors in here, these do not work within the SVG.
            anime({
                targets: e.currentTarget,
                easing: 'linear',
                color: "#000000",
                translateX: 10,
                duration: 200,
                background: "linear-gradient(to right, var(--type) 100%, var(--background) 0%)",
            });
        })
        $( ".project_link" ).on("mouseleave touchmove click",function(e) {
            anime({
                targets: e.currentTarget,
                easing: 'linear',
                translateX: 0,
                color: "#FFFFFF",
                duration: 200,
                background: "linear-gradient(to right, var(--type) 0%, var(--background) 0%)",
            });
        })
    }
}