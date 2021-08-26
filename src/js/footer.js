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
            this.displayToast()
            navigator.clipboard.writeText("http://mottola.fr/");
        }
    }

    displayToast(){
        $(".toast_footer").css("display", "flex")
        anime({
            targets: ".toast_footer",
            easing:'linear',
            opacity: [
                { value: 0, duration: 0},
                { value: 1, duration: 100},
                { value: 0, duration: 600, delay: 800 }
            ],
            duration: 300,
            complete: function() {
                $(".toast_footer").css("display", "none")
            }
        });
        
    }
}