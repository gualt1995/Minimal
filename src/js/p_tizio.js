require('../css/p_tizio.css');
import tizioOffDark from '../png/tizio - off.png';
import tizioOnDark from '../png/tizio - on.png';
import tizioOffLight from '../png/tizio - alpha - off.png';
import tizioOnLight from '../png/tizio - alpha - on.png';
import anime from 'animejs/lib/anime.es.js';
import tizioOnMp3 from '../audio/tizio_on.mp3'; 
import tizioOffMp3 from '../audio/tizio_off.mp3'; 

import {Howl} from 'howler';

export default class tizio{
    constructor(){
        $("#tizio_off").attr("src", tizioOffDark);
        $("#tizio_on").attr("src", tizioOnDark);

        anime({
            targets: $( "#tizio_off")[0],
            duration: 1,
            opacity: 0,
        });

        this.themeChangeObserver();

        $( ".tizio_frame" ).on('click',() => {
            if($( ".tizio_frame" ).hasClass("off")){
                $( ".tizio_frame" ).removeClass("off")
                this.turnLightOn()
            }else{
                $( ".tizio_frame" ).addClass("off")
                this.turnLightOff()
            }
        })
    }

    turnLightOn(){
        var sound = new Howl({
            src: [tizioOnMp3]  
        });
        sound.play();
        anime({
            targets: "#tizio_on",
            easing: 'linear',
            duration: 100,
            opacity: 1,
        });
        anime({
            targets: "#tizio_off",
            easing: 'linear',
            duration: 200,
            opacity: 0,
        });
    }

    turnLightOff(){
        var sound = new Howl({
            src: [tizioOffMp3]  
        });
        sound.play();
        anime({
            targets: "#tizio_on",
            easing: 'linear',
            duration: 200,
            opacity: 0,
        });
        anime({
            targets: "#tizio_off",
            easing: 'linear',
            duration: 100,
            opacity: 1,
        });
    }

    themeChangeObserver(){   

        var observer = new MutationObserver(() => {
            var currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--theme');
            if(currentTheme === 'night'){
                $("#tizio_off").attr("src", tizioOffDark);
                $("#tizio_on").attr("src", tizioOnDark);            
            }else{
                $("#tizio_off").attr("src", tizioOffLight);
                $("#tizio_on").attr("src", tizioOnLight);      
            }  
        });
        
        var target = document.getElementsByClassName('theme_open')[0]   
        observer.observe(target, { childList : true});
    }
}