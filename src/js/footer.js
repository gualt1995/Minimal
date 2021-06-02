require('../css/footer.css');
import anime from 'animejs/lib/anime.es.js';

export default class footer{
    constructor(contactCard,cvCard){
        var template = require("../templates/footer.handlebars");
        var context = require('../data/footer.json');

        var html = template(context)
        $('.footer_btn_flex').html(html);


        var that = this
        $( "#footer_btn_resume" ).on('click',function() {
            cvCard.ShowCv()
        })
        $( "#footer_btn_connect" ).on('click',function() {
            contactCard.ShowContact()
        })
        $( "#footer_btn_share" ).on('click',function() {
            that.share()
        })
        anime({
            targets: $( "#toast_footer")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 0,
        });

        $( ".footer_btn" ).on("mouseenter touchstart",(e) => {
            anime({
                targets:e.currentTarget.getElementsByClassName('footer_btn_background')[0],
                easing: 'easeOutExpo',
                opacity: 1,
                duration: 300,
            });
        })
        
        $( ".footer_btn" ).on("mouseleave touchmove click",(e) =>  {
            anime({
                targets: e.currentTarget.getElementsByClassName('footer_btn_background')[0],
                easing: 'easeInOutQuad',
                opacity: 0.5,
                duration: 300,
            });
        })
    }

    share(){
        if (navigator.share) {
            console.log("Sharing Page")
            navigator.share({
                title: 'Share this website',
                url: 'http://mottola.fr/'
            })
        } else {
            console.log("Copying Page url to clipboard")
            this.displayToast()
            navigator.clipboard.writeText("http://mottola.fr/");
        }
    }

    displayToast(){
        anime({
            targets: $( "#toast_footer")[0],
            easing:'easeOutBounce',
            opacity : 1,
            duration: 300,
            translateY: 0,
            complete: function() {
                anime({
                    targets: $( "#toast_footer")[0],
                    opacity : 0,
                    translateY: "-100%",
                    easing: 'cubicBezier(.5, .05, .1, .3)',
                    duration: 200,
                    delay: 800,
                });
            }
        });
    }
}