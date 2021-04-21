require('../css/project.css');
import anime from 'animejs/lib/anime.es.js';

export default class project{
    constructor(){
        anime({
            targets: ".project_link",
            duration: 1,
            background: "linear-gradient(to right, var(--white) 0%, transparent 0)",
        });
        $( ".project_link" ).on("mouseenter",function(e) {
            //do note use variavbles for colors in here, these do not work within the SVG.
            anime({
                targets: e.currentTarget,
                easing: 'spring(1, 100, 15, 5)',
                color: "#000000",
                translateX: 10,
                background: "linear-gradient(to right, var(--white) 100%, transparent 0)",
            });
        })
        $( ".project_link" ).on("mouseleave",function(e) {
            anime({
                targets: e.currentTarget,
                easing: 'spring(1, 100, 15, 5)',
                translateX: 0,
                color: "#FFFFFF",
                background: "linear-gradient(to right, var(--white) 0%, transparent 0)",
            });
        })
    }
}