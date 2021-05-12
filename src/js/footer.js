require('../css/footer.css');
import anime from 'animejs/lib/anime.es.js';

export default class footer{
    constructor(contactCard,cvCard){
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
            targets: '.circle',
            scale: [
                { value: 1.05, duration: 2000 },
                { value: 1, duration: 1000},
              ],
            opacity: [
                { value: 0.6, duration: 2000 },
                { value: 1, duration: 1000},
            ],
            loop: true,
            easing: 'cubicBezier(0.365, 0.115, 0.530, 0.860)',
            delay: anime.stagger(600) // increase delay by 100ms for each elements.
        });
        anime({
            targets: $( "#toast_footer")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 0,
        });
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