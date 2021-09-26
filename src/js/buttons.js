require('../css/buttons.css');
import anime from 'animejs/lib/anime.es.js';

export default class buttons{
    constructor(){
        $( ".icon_btn" ).on('mouseenter touchstart', (e) => {
            this.shake(e.currentTarget.id)
        })

        $( ".text_btn" ).on('mouseenter touchstart', (e) => {
            e.currentTarget.style.textDecoration="underline"
        })

        $( ".text_btn" ).on('mouseleave touchmove', (e) => {
            e.currentTarget.style.textDecoration=""
        })

        $( ".contained_button" ).on('mouseenter touchstart', (e) => {
            $(e.currentTarget).addClass("contained_button_hover")
        })

        $( ".contained_button" ).on('mouseleave touchmove', (e) => {
            $(e.currentTarget).removeClass("contained_button_hover")
        })

        $( "a" ).on('mouseenter touchstart', (e) => {
            $(e.currentTarget).addClass("a_selected")
        })

        $( "a" ).on('mouseleave touchmove', (e) => {
            $(e.currentTarget).removeClass("a_selected")
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