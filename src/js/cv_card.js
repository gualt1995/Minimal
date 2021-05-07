require('../css/cv_card.css');
import anime from 'animejs/lib/anime.es.js';
import close from '../assets/close.svg';
import download from '../assets/arrow_download.svg';


export default class cvCard{
    constructor(){
        $("#cv_fab_close_img").attr("src", close);
        $("#cv_fab_download_img").attr("src", download);
        $( "#cv_frame" ).addClass( "hidden" )
        anime({
            targets: $( "#cv_frame")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 1,
        });
        anime({
            targets: $( "#cv_btn_frame")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 1,
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
        $( "#cv_fab_download" ).on('mouseenter, touchstart',function() {
            that.shake("cv_fab_download_img")
        })
        $("#cv_fab_download").on('click',function() {
            // // hope the server sets Content-Disposition: attachment!
        });
        $( "#cv_fab_close" ).on('mouseenter, touchstart',function() {
            that.shake("cv_fab_close_img")
        })

        this.scrollPosition = 0

        console.log("created cv card")
    }
      
    hideCv(){
      if(!$( "#cv_frame" ).hasClass("hidden")){
        console.log("hiding cv card")
        $( window ).off("scroll", this.lockOnCv);
        $( "#cv_frame" ).addClass( "hidden" )
        anime({
            targets: $( "#cv_frame")[0],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            easing: 'linear',
            duration: 150,
        });
        anime({
            targets: $( "#cv_btn_frame")[0],
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "-100%",
            duration: 150,
            complete: function() {
                anime({
                    targets: $( "#cv_frame")[0],
                    easing: "easeInBack",
                    opacity : 0,
                    translateY: "-100%",
                    duration: 300,
                });
            }
        });
      }
    }
  
    ShowCv(){
        if($( "#cv_frame" ).hasClass("hidden")){
            console.log("showing cv card")
            this.scrollPosition = $(document).scrollTop()
            $( window ).on("scroll", {scroll:this.scrollPosition} ,this.lockOnCv);
            $( "#cv_frame" ).removeClass( "hidden" )
            anime({
                targets: $( "#cv_frame")[0],
                easing: "easeOutCirc",
                opacity : 1,
                translateY: 0,
                duration: 400,
                complete: function() {
                    anime({
                        targets: $( "#cv_btn_frame")[0],
                        easing: "easeOutBack",
                        opacity : 1,
                        translateY: 0,
                        duration: 400,
                    });
                    anime({
                        targets: $( "#cv_frame")[0],
                        backgroundColor: 'rgba(0, 0, 0, 1)',
                        easing: 'cubicBezier(.5, .05, .1, .3)',
                        duration: 400,
                    });
                }
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