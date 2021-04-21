require('../css/title_screen.css');
import anime from 'animejs/lib/anime.es.js';

export default class title_screen{
    constructor()
    {
        $( "#btn_works" ).on('click',function() {
            console.log("hiding title screen")

            anime({
                targets: ".title_screen_frame",
                opacity : 0,
                easing: 'linear',
                duration: 200,
                complete: function() {
                    $(".title_screen_frame").hide();
                }
            }); 
        });
    }
}

