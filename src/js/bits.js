require('../css/bits.css');
import anime from 'animejs/lib/anime.es.js';
import mugge from '../assets/thumbnail_mugge.png';
import lexon from '../assets/thumbnail_lexon.png';
import saab from '../assets/thumbnail_saab.png';
import browser from '../assets/missing_image.png';


import arrow from '../assets/arrow_bits.svg';

export default class bits{
    constructor(){
        var template = require("../templates/bits.handlebars");
        var context = require('../data/bits.json');

        var html = template(context)
        $('.bits_flex_wrapper').html(html);

        $(".bits_arrow").attr("src", arrow);
        $(".img_mugge").attr("src", mugge);
        $(".img_lexon").attr("src", lexon);
        $(".img_saab").attr("src", saab);
        $(".img_browser").attr("src", browser);

        $( ".bits_card" ).on('mouseenter touchstart',function(e) {
            $(this).css('z-index', 1);
            anime({
                targets: e.currentTarget,
                scale:1.15,
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });

        $( ".bits_card" ).on('mouseleave touchmove click',function(e) {
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