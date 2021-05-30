require('../css/icons.css');

import anime from 'animejs/lib/anime.es.js';

export default class icons{
    constructor(){
        var template = require("../templates/icons.handlebars");
        var context = require('../data/icons.json');
        var html = template(context)
        $('#icons_group_monitoring').html(html);

        $( ".icons_icon" ).on("mouseenter touchstart",function(e) {
            //console.log(e.currentTarget.children[0].getAttribute('d'))
            anime({
                targets: ".icons_preview_image",
                scale: [
                    { value: 0.5, duration: 0},
                    { value: 1, duration: 200}
                  ],
                easing: 'easeOutQuart',
            });
            $('path','.icons_preview_image').attr('d',e.currentTarget.children[0].getAttribute('d'))
            $('.icons_preview_name').html(e.currentTarget.id)
        })
    }
}