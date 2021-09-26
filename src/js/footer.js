require('../css/footer.css');
import anime from 'animejs/lib/anime.es.js';

export default class footer{
    constructor(contactCard,cvCard){        
        var footnote = require("../templates/footnote.handlebars");
        var html = footnote()
        $( ".footer_frame" ).append(html);

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

        $( "#icon_btn_to_top" ).on('click',function() {
            window.scrollTo(0, 0);
        })
        window.setInterval( () =>{
            this.setCurrentParisTime()
        }, 1000);
        
    }

    setCurrentParisTime(){
        let options = {
            timeZone: 'Europe/Paris',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
          },
          formatter = new Intl.DateTimeFormat([], options);
        
        $('.set_time_here').html(formatter.format(new Date()))
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
        var tl = anime.timeline();
        tl.add({
            targets: ".toast_container",
            easing:'easeOutCirc',
            duration: 300,
            translateY: "150px",
        }).add({
            targets: ".toast_container",
            translateY: 0,
            easing: 'cubicBezier(.5, .05, .1, .3)',
            duration: 200,
        }, 1400)        
    }
}