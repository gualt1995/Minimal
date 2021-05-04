require('../css/bits.css');
import anime from 'animejs/lib/anime.es.js';
import mugge from '../assets/thumbnail_mugge.png';
import lexon from '../assets/thumbnail_lexon.png';



export default class bits{
    constructor(){
        var template = require("../templates/bits.handlebars");
        var context = 
        { 
            "bits" : 
            [
                { 
                    "title" : "MUGGE", 
                    "url" : "https://www.figma.com/community/file/968632724189976512/Mugge",
                    "description" : "developer",
                    "bits_img_class_name" : "img_mugge"
                },
                {
                    "title" : "TYKHO.3", 
                    "url" : "https://www.figma.com/community/file/968550486589020045/TYKHO.3",
                    "description" : "developer",
                    "bits_img_class_name" : "img_lexon"
                }    
            ]
        }
        var html = template(context)
        $('.bits_flex_wrapper').html(html);

        $(".img_mugge").attr("src", mugge);
        $(".img_lexon").attr("src", lexon);

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