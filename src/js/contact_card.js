require('../css/contact_card.css');
import anime from 'animejs/lib/anime.es.js';
import close from '../assets/close.svg';
import copy from '../assets/copy.svg';

export default class contactCard{
    constructor(){
        $("#contact_fab_close_img").attr("src", close);
        $("#contact_fab_copy_img").attr("src", copy);
        $( "#contact_card_frame" ).addClass( "hidden" )

        anime({
            targets: $( "#contact_card_frame")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 1
        });
        anime({
            targets: $( "#contact_fab_close")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 1,
        });
        anime({
            targets: $( "#toast_contact")[0],
            opacity : 0,
            translateY: "-100%",
            duration: 1,
        });

        var that = this
        $( "#contact_fab_copy" ).on('click',() => {
            that.DisplayToast()
        });
        $( "#contact_fab_close" ).on('click',() => {
            that.HideContact(true)
        });
        $( "#contact_card_frame" ).on('click',(e) => {
            if(e.target == $( "#contact_card_frame" )[0]){
                that.HideContact(true)
            }
        });
        $( "#contact_fab_copy" ).on('mouseenter touchstart',() => {
            that.shake("contact_fab_copy_img")
        })
        $( "#contact_fab_close" ).on('mouseenter touchstart',() =>{
            that.shake("contact_fab_close_img")
        })
        $( ".email, .contact_link_frame a" ).on('mouseenter touchstart',(e) => {
            anime({
                targets: e.target,
                duration: 100,
                easing: 'linear',
                background: "linear-gradient(to top, var(--accent) 100%, transparent 0)",
            });
        })
        $( ".email, .contact_link_frame a" ).on('mouseleave touchmove click',(e) => {
            anime({
                targets: e.target,
                duration:100,
                easing: 'linear',
                background: "linear-gradient(to top, var(--accent) 0%, transparent 0)",
            });
        })

        this.scrollPosition = 0

        console.log("created contact card")
    }
      
    HideContact(){
      if(!$( "#contact_card_frame" ).hasClass("hidden")){
        $( window ).off("scroll", this.lockOnCard);
        console.log("hiding contact card")
        $( "#contact_card_frame" ).addClass( "hidden" )
        anime({
            targets: $( "#contact_card_frame")[0],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            easing: 'linear',
            duration: 150,
        });
        anime({
            targets: $( "#contact_fab_close")[0],
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "-100%",
            duration: 150,
            complete: () => {
                anime({
                    targets: $( "#contact_card_frame")[0],
                    easing: "easeInBack",
                    opacity : 0,
                    translateY: "-100%",
                    duration: 300,
                });
            }
        });
      }
    }
  
    ShowContact(){
        if($( "#contact_card_frame" ).hasClass("hidden")){
            this.scrollPosition = $(document).scrollTop()
            $( window ).on("scroll", {scroll:this.scrollPosition} ,this.lockOnCard);
            $( "#contact_card_frame" ).removeClass( "hidden" )
            anime({
                targets: $( "#contact_card_frame")[0],
                easing: "easeOutCirc",
                opacity : 1,
                translateY: 0,
                duration: 400,
                complete: () => {
                    anime({
                        targets: $( "#contact_fab_close")[0],
                        easing: "easeOutBack",
                        opacity : 1,
                        translateY: 0,
                        duration: 400,
                    });
                    anime({
                        targets: $( "#contact_card_frame")[0],
                        backgroundColor: 'rgba(0, 0, 0, 1)',
                        easing: 'cubicBezier(.5, .05, .1, .3)',
                        duration: 400,
                    });
                }
            });
        }
    }

    DisplayToast(){
        console.log("Copy email to clipboard")
        navigator.clipboard.writeText("gualtiero@mottola.fr");
        anime({
            targets: $( "#contact_fab_copy")[0],
            easing: 'linear',
            backgroundColor: [
                { value: 'rgba(255, 255, 255,0.5)', duration: 0 },
                { value: 'rgba(0, 0, 0)', duration: 200,}
            ]
        });
        anime({
            targets: $( "#toast_contact")[0],
            easing:'easeOutBounce',
            opacity : 1,
            duration: 300,
            translateY: 0,
            complete: () => {
                anime({
                    targets: $( "#toast_contact")[0],
                    opacity : 0,
                    translateY: "-100%",
                    easing: 'cubicBezier(.5, .05, .1, .3)',
                    duration: 200,
                    delay: 400,
                });
            }
        });
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

    lockOnCard(event){
        window.scrollTo(0, event.data.scroll);
    }
}