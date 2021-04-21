require('../css/p_martingale.css');
import anime from 'animejs/lib/anime.es.js';
import heart from '../assets/vitals_heart.svg';
import spo2 from '../assets/vitals_o2.svg';
import arrow_volume from '../assets/arrow_volume.svg';

export default class martingale{
    constructor(){
        $(".vitals_heart").attr("src", heart);
        $(".vitals_o2").attr("src", spo2);
        $(".vitals_arrow").attr("src", arrow_volume);
        anime({
            targets: '.vitals_graph path',
            strokeDashoffset: [1000, 0],
            easing: 'linear',
            duration: 3000,
            loop: true,
        }); 
        anime({
            targets: '.vitals_heart',
            keyframes: [
                {scale: 1.1},
                {scale: 1},
            ],
            duration: 1500,
            loop:true
        })
        var that = this
        
        window.setInterval(function(){
            if( $("#vitals_bpm_digit").text() != "--"){
                $("#vitals_bpm_digit").text(that.getRandomInt(80,85));
            }
        }, 2000);

        window.setInterval(function(){
            if( $("#vitals_spo2_digit").text() != "--"){
                $("#vitals_spo2_digit").text(that.getRandomInt(97,99));
            }
        }, 3000);

        $( ".vitals_arrow" ).on('mouseenter',function(event) {
            that.shake(event.target.id)
        })

        $("#vitals_arrow_v1").on('click',function(e){
            window.open("https://www.editions-ellipses.fr/accueil/10660-la-martingale-volume-1-2e-edition-9782340040953.html");    
        });
        
        $("#vitals_arrow_v2").on('click',function(e){
            window.open("https://www.editions-ellipses.fr/accueil/10661-la-martingale-volume-2-2e-edition-9782340040960.html");    
        });

        $('.vitals_switch_input').attr('checked', true);
        $('.vitals_switch_input').on('change',function(event) {
            var id = $(event.currentTarget).attr('id')
            var graph = $("#" + id + "_graph")
            var led =  $("#" + id + "_led")
            var digits = $("#" + id + "_digit")
            if(this.checked) {
                if(id == "vitals_spo2"){
                    digits.text(95);
                }else{
                    digits.text(80);
                }
                anime({
                    targets: graph[0],
                    opacity: 1,
                    duration: 3000,
                })
                led.css(
                    {'background-color': 'var(--vitals_led_on)',
                    'box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 0px 10px 5px rgba(0, 255, 87, 0.3), inset 0px -2px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(255, 255, 255, 0.25)'}
                );
            }else{
                digits.text("--");
                led.css(
                    {'background-color': 'var(--vitals_led_off)',
                    'box-shadow':'0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px -2px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(255, 255, 255, 0.25)' }
                    );
                anime({
                    targets: graph[0],
                    opacity: 0,
                    duration: 3000,
                })
            }
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    shake(idTarget){
        var xMax = 16;
        anime({
            targets: "#"+idTarget,
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