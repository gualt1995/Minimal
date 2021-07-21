require('../css/cv_card.css');
import anime from 'animejs/lib/anime.es.js';

export default class cvCard{
    constructor(){
        var template = require("../templates/experience.handlebars");
        var context = require('../data/experiences.json');
        var html = template(context)
        $('.cv_timeline').html(html);
        $( "#cv_frame" ).addClass( "hidden" )
        anime({
            targets: "#cv_frame",
            opacity : 0,
            translateY: "-100%",
            duration: 0,
        });
        anime({
            targets: "#cv_btn_frame",
            opacity : 0,
            translateY: "-100%",
            duration: 0,
        });
        var that = this
        $( "#cv_fab_close" ).on('click',function() {
            that.hideCv(true)
        });
        $( "#cv_frame" ).on('click',function(e) {
            if(e.target == $( "#cv_frame" )[0]){
                that.hideCv(true)
            }
        });
        $( "#cv_fab_download" ).on('mouseenter touchstart',function() {
            that.shake("cv_fab_download_img")
        })
        $("#cv_fab_download").on('click',function() {
            this.typecolor = getComputedStyle(document.body).getPropertyValue('--type')
            this.bgcolor = getComputedStyle(document.body).getPropertyValue('--background')
            anime({
                targets:"#cv_fab_download",
                easing: 'linear',
                backgroundColor: [
                    { value: this.typecolor, duration: 0 },
                    { value: this.bgcolor, duration: 200,}
                ],
                complete: () => {
                    //Animating to an empty value does not seem to work in anime.js
                    document.getElementById('cv_fab_download').style.backgroundColor=""
                }
            });
        });
        
        $( "#cv_fab_close" ).on('mouseenter touchstart',function() {
            that.shake("cv_fab_close_img")
        })
        this.scrollPosition = 0
    }
      
    hideCv(){
      if(!$( "#cv_frame" ).hasClass("hidden")){
        console.log("hiding cv card")
        $( window ).off("scroll", this.lockOnCv);
        $( "#cv_frame" ).addClass( "hidden" )
        var tl = anime.timeline();
        document.getElementById("cv_frame").style.backgroundColor=""
        tl.add({
            targets: "#cv_btn_frame",
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "-100%",
            duration: 150,
        },0).add({
            targets: "#cv_frame",
            easing: "easeInBack",
            opacity : 0,
            translateY: "-100%",
            duration: 300,
        },0)
      }
    }
  
    ShowCv(){
        if($( "#cv_frame" ).hasClass("hidden")){
            console.log("showing cv card")
            this.scrollPosition = $(document).scrollTop()
            $( window ).on("scroll", {scroll:this.scrollPosition} ,this.lockOnCv);
            $( "#cv_frame" ).removeClass( "hidden" )
            var tl = anime.timeline();
            document.getElementById('cv_frame').style.backgroundColor="var(--background)"
            tl.add({
                targets: "#cv_frame",
                easing: "easeOutCirc",
                opacity : 1,
                translateY: 0,
                duration: 400,
            }).add({
                targets: "#cv_btn_frame",
                easing: "easeOutBack",
                opacity : 1,
                translateY: 0,
                duration: 400,
            });
        }
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

    lockOnCv(event){
        window.scrollTo(0, event.data.scroll);
    }
}