require('../css/contact_card.css');
import anime from 'animejs/lib/anime.es.js';

export default class contactCard{
    constructor(){
        $( "#contact_card_frame" ).addClass( "hidden" )

        anime({
            targets: "#contact_card_frame",
            opacity : 0,
            translateY: "-100%",
            duration: 1
        });
        anime({
            targets: "#contact_fab_close",
            opacity : 0,
            translateY: "-100%",
            duration: 1,
        });
        anime({
            targets: "#toast_contact",
            opacity : 0,
            translateY: "-100%",
            duration: 1,
        });

        var that = this
        $( "#contact_fab_copy" ).on('click',() => {
            that.CopyEmail()
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
    }
      
    HideContact(){
      if(!$( "#contact_card_frame" ).hasClass("hidden")){
        $( window ).off("scroll", this.lockOnCard);
        console.log("hiding contact card")
        $( "#contact_card_frame" ).addClass( "hidden" )
        document.getElementById("contact_card_frame").style.backgroundColor=""
        var tl = anime.timeline();
        tl.add({
            targets: "#contact_fab_close",
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "-100%",
            duration: 150,
        }).add({
            targets: "#contact_card_frame",
            easing: "easeInBack",
            opacity : 0,
            translateY: "-100%",
            duration: 300,
        })
      }
    }
  
    ShowContact(){
        if($( "#contact_card_frame" ).hasClass("hidden")){
            this.scrollPosition = $(document).scrollTop()
            $( window ).on("scroll", {scroll:this.scrollPosition} ,this.lockOnCard);
            $( "#contact_card_frame" ).removeClass( "hidden" )
            var tl = anime.timeline();
            tl.add({
                targets: "#contact_card_frame",
                easing: "easeOutCirc",
                opacity : 1,
                translateY: 0,
                duration: 400,
                complete: () => {
                    document.getElementById('contact_card_frame').style.backgroundColor="var(--background)"
                }
            }).add({
                targets: "#contact_fab_close",
                easing: "easeOutBack",
                opacity : 1,
                translateY: 0,
                duration: 400,
            })
        }
    }

    CopyEmail(){
        console.log("Copy email to clipboard")
        navigator.clipboard.writeText("gualtiero@mottola.fr");

        this.typecolor = getComputedStyle(document.body).getPropertyValue('--type')
        this.bgcolor = getComputedStyle(document.body).getPropertyValue('--background')

        anime({
            targets:"#contact_fab_copy",
            easing: 'linear',
            backgroundColor: [
                { value: this.typecolor, duration: 0 },
                { value: this.bgcolor, duration: 200,}
            ],
            complete: () => {
                //Animating to an empty value does not seem to work in anime.js
                document.getElementById('contact_fab_copy').style.backgroundColor=""
            }
        });
        var tl = anime.timeline();
        tl.add({
            targets: "#toast_contact",
            easing:'easeOutBounce',
            opacity : 1,
            duration: 300,
            translateY: 0,
        }).add({
            targets: "#toast_contact",
            opacity : 0,
            translateY: "-100%",
            easing: 'cubicBezier(.5, .05, .1, .3)',
            duration: 200,
        }, 400)
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