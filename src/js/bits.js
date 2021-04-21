require('../css/bits.css');
import anime from 'animejs/lib/anime.es.js';

export default class bits{
    constructor(){
        var template = require("../templates/bits.handlebars");
        var context = { 
            "title" : "Ritesh Kumar", 
            "description" : "developer",
            "url" : "./assets/missing_image.png"
        };
        var html = template(context)
        $('.bits_flex_wrapper').html(html);

        $( ".bits_card" ).on('mouseenter',function(e) {
            $(this).css('z-index', 1);
            anime({
                targets: e.currentTarget,
                scale:1.15,
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });

        $( ".bits_card" ).on('mouseleave',function(e) {
            $(this).css('z-index', 0);
            anime({
                targets: e.currentTarget,
                scale:1,
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });

    }
}