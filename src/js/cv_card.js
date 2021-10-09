require('../css/cv_card.css');
import anime from 'animejs/lib/anime.es.js';

export default class cvCard{
    constructor(){
        var template = require("../templates/experience.handlebars");
        var context = require('../data/experiences.json');
        var html = template(context)   
        $('.resume_frame').html(html);

        $("#btn_download").on('click',function() {
            this.typecolor = getComputedStyle(document.body).getPropertyValue('--type')
            this.bgcolor = getComputedStyle(document.body).getPropertyValue('--background')
            anime({
                targets:"#btn_download",
                easing: 'linear',
                backgroundColor: [
                    { value: this.typecolor, duration: 0 },
                    { value: this.bgcolor, duration: 200,}
                ],
                complete: () => {
                    //Animating to an empty value does not seem to work in anime.js
                    document.getElementById('btn_download').style.backgroundColor=""
                }
            });
        });
    }
}