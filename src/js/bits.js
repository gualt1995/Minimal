require('../css/bits.css');
import anime from 'animejs/lib/anime.es.js';
import mugge from '../thumbnails/Mugge.png';
import lexon from '../thumbnails/Lexon.png';
import saab from '../thumbnails/Saab.png';
import logs from '../thumbnails/Logs.png';
import chrome from '../thumbnails/Chrome.png';
import space from '../thumbnails/Space.png';

export default class bits{
    constructor(){
        var template = require("../templates/bits.handlebars");
        var context = require('../data/bits.json');

        var html = template(context)
        $('.bits_flex_wrapper').html(html);

        $(".img_mugge").attr("src", mugge);
        $(".img_lexon").attr("src", lexon);
        $(".img_saab").attr("src", saab);
        $(".img_browser").attr("src", chrome);
        $(".img_logs").attr("src", logs);
        $(".img_space").attr("src", space);

        $( ".bits_card" ).on('mouseenter touchstart',function(e) {
            $(this).css('z-index', 1);
            anime({
                targets: e.currentTarget,
                scale:1.1,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });

        $( ".bits_card" ).on('mouseleave touchmove click',function(e) {
            $(this).css('z-index', 0);
            anime({
                targets: e.currentTarget,
                scale:1,
                duration: 300,
                easing: 'easeInOutQuad'
            });
        });

    }
}