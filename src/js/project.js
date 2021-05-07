require('../css/project.css');

import anime from 'animejs/lib/anime.es.js';
import arrow from '../assets/arrow_link.svg';

export default class project{
    constructor(){  
        var template = require("../templates/project.handlebars");
        var website = { 
            "title" : "[ This ]", 
            "subtitle" : "WEB DEV",
            "body" : "Build with the classic trio, HTML, CSS and Js, partly generated with Handlebars and animated with anime.js, this is my storefront to the world ! Feel free to check out the code on github, and the prototypes in figma, mostly used to make sure that this page would look good on all devices; no matter their body shape…",
            "tags" : [
                "Frontend",
                "Web",
                "anime.js",
            ],
            "links": [
                { url: "https://github.com/gualt1995/Minimal", name: "Code on Github", icon: "fa-github"},
                { url: "https://www.figma.com", name: "Designed in Figma", icon: "fa-figma"}
            ],
        };
        var html = template(website)
        $('#project_description_web').html(html)

        var website = { 
            "title" : "Martingale", 
            "subtitle" : "Mobile App",
            "body" : "La martingale is the companion App to a set of worksheets desgined to help metidical student Pass the French ECNi exam. The app allows flexible access to the Knowledge base, both on Android and iOS, thanks to unlock tokens printed in each copy of the book. Feel free to check it out on App stores !",
            "tags" : [
                "Mobile",
                "Java",
                "Swift",
            ],
            "links": [
                { url: "https://apps.apple.com/fr/app/la-martingale/id1460836735", name: "App Store", icon: "fa-apple"},
                { url: "https://play.google.com/store/apps/details?id=com.agency55.laMartingale&hl=en&gl=US", name: "Play Store", icon: "fa-google-play"}
            ],
        };
        var html = template(website)
        $('#project_description_martigale').html(html)

        anime({
            targets: ".project_link",
            duration: 1,
            background: "linear-gradient(to right, var(--white) 0%, var(--black) 0%)",
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
                background: "linear-gradient(to right, var(--white) 100%, var(--black) 0%)",
            });
        })
        $( ".project_link" ).on("mouseleave touchmove click",function(e) {
            anime({
                targets: e.currentTarget,
                easing: 'linear',
                translateX: 0,
                color: "#FFFFFF",
                duration: 200,
                background: "linear-gradient(to right, var(--white) 0%, var(--black) 0%)",
            });
        })
    }
}