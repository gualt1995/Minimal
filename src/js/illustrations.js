require('../css/illustrations.css');
import mugge from '../thumbnails/Mugge.png';
import lexon from '../thumbnails/Lexon.png';
import saab from '../thumbnails/Saab.png';
import alfa from '../thumbnails/Alfa.png';
import music from '../thumbnails/Music.png';
import space from '../thumbnails/Space.png';
import storm from '../thumbnails/Storm.png';
import tizio from '../thumbnails/Tizio.png';
import phones from '../thumbnails/Phones.png';


export default class illustrations{
    constructor(){
        var template = require("../templates/illustrations.handlebars");
        var context = require('../data/illustrations.json');

        var html = template(context)
        $('.vector_frame').html(html);

        $(".img_mugge").attr("src", mugge);
        $(".img_lexon").attr("src", lexon);
        $(".img_saab").attr("src", saab);
        $(".img_alfa").attr("src", alfa);
        $(".img_music").attr("src", music);
        $(".img_space").attr("src", space);
        $(".img_storm").attr("src", storm);
        $(".img_tizio").attr("src", tizio);
        $(".img_phones").attr("src", phones);


        $( ".illustrations_card" ).on('mouseenter',function(e) {
            $(e.currentTarget).addClass("illustrations_card_hover")
            $(e.currentTarget).find('.link_indicator').addClass("link_indicator_hover")
        });

        $( ".illustrations_card" ).on('mouseleave click',function(e) {
            $(e.currentTarget).removeClass("illustrations_card_hover")
            $(e.currentTarget).find('.link_indicator').removeClass("link_indicator_hover")

        });

    }
}