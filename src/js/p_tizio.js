require('../css/p_tizio.css');
import tizioOff from '../assets/tizio - off.png';
import tizioOn from '../assets/tizio - on.png';
import anime from 'animejs/lib/anime.es.js';
import tizioOnMp3 from '../audio/tizio_on.mp3'; 
import tizioOffMp3 from '../audio/tizio_off.mp3'; 



export default class tizio{
    constructor(){
        let soundOn = new Audio(tizioOnMp3);
        let soundOff = new Audio(tizioOffMp3);
        $("#tizio_off").attr("src", tizioOff);
        $("#tizio_on").attr("src", tizioOn);
        anime({
            targets: $( "#tizio_off")[0],
            duration: 1,
            opacity: 0,
        });
        $( ".tizio_frame" ).on('click',function(e) {
            if($( ".tizio_frame" ).hasClass("off")){
                $( ".tizio_frame" ).removeClass("off")
                soundOn.play();
                anime({
                    targets: $( "#tizio_on")[0],
                    easing: 'linear',
                    duration: 100,
                    opacity: 1,
                });
                anime({
                    targets: $( "#tizio_off")[0],
                    easing: 'linear',
                    duration: 200,
                    opacity: 0,
                });
            }else{
                soundOff.play();
                $( ".tizio_frame" ).addClass("off")
                anime({
                    targets: $( "#tizio_on")[0],
                    easing: 'linear',
                    duration: 50,
                    opacity: 0,
                });
                anime({
                    targets: $( "#tizio_off")[0],
                    easing: 'cubicBezier(0.000, 0.345, 0.450, 0.070)',
                    duration: 500,
                    opacity: 1,
                });

            }
        })
    }
}