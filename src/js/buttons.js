require('../css/buttons.css');
import anime from 'animejs/lib/anime.es.js';

export default class buttons{
    constructor(){

        $( ".icon_btn" ).on('mouseenter touchstart', (e) => {
            $(e.currentTarget).addClass("icon_btn_hover")
        })

        $( ".icon_btn" ).on('mouseleave touchmove click', (e) => {
            $(e.currentTarget).removeClass("icon_btn_hover")
        })

        $( ".icon_btn" ).on('click', (e) => {
            this.shake(e.currentTarget.id)
        })

        $( ".text_btn" ).on('mouseenter touchstart', (e) => {
            e.currentTarget.style.textDecoration="underline"
        })

        $( ".text_btn" ).on('mouseleave touchmove click', (e) => {
            e.currentTarget.style.textDecoration=""
        })

        $( ".contained_button" ).on('mouseenter', (e) => {
            $(e.currentTarget).addClass("contained_button_hover")
        })

        $( ".contained_button" ).on('mouseleave', (e) => {
            $(e.currentTarget).removeClass("contained_button_hover")
        })

        $( "a" ).on('mouseenter', (e) => {
            $(e.currentTarget).children(".link_indicator").addClass("link_indicator_hover");
            $(e.currentTarget).addClass("a_selected")
        })

        $( "a" ).on('mouseleave' , (e) => {
            $(e.currentTarget).removeClass("a_selected")
            $(e.currentTarget).children(".link_indicator").removeClass("link_indicator_hover");

        })

    }

    shake(idTarget){
        var xMax = 16;
        anime({
            targets: "#" + idTarget + " > svg",
            easing: 'easeInOutSine',
            duration: 300,
            rotate: [
                { value: xMax * -1, },
                { value: xMax, },
                { value: xMax/-2, },
                { value: xMax/2, },
                { value: 0 }
            ],
        });
    }
}