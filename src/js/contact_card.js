require('../css/contact_card.css');
import anime from 'animejs/lib/anime.es.js';

export default class contactCard{
    constructor(){
        var template = require("../templates/contact_card.handlebars");
        var html = template()
        $('.screen_space').append(html);

        $( ".contact_card_frame" ).addClass( "hidden" )

        anime({
            targets: '.contact_card_frame',
            opacity : 0,
            translateY: "-100%",
        });

        anime({
            targets: "#icon_btn_contact_close",
            opacity : 0,
            translateY: "-100%",
        });

        var that = this
        $( "#icon_btn_copy" ).on('click',() => {
            console.log("test")
            that.CopyEmail()
        });
        $( "#icon_btn_contact_close" ).on('click',() => {
            that.HideContact(true)
        });
        $( ".contact_card_frame" ).on('click',(e) => {
            if(e.target == $( ".contact_card_frame" )[0]){
                that.HideContact(true)
            }
        });
        this.scrollPosition = 0
    }
      
    HideContact(){
      if(!$( ".contact_card_frame" ).hasClass("hidden")){
        $( window ).off("scroll", this.lockOnCard);
        $( ".contact_card_frame" ).addClass( "hidden" )
        document.getElementById("contact_card_frame").style.backgroundColor=""
        var tl = anime.timeline();
        tl.add({
            targets: "#icon_btn_contact_close",
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "-100%",
            duration: 150,
        }).add({
            targets: ".contact_card_frame",
            easing: "easeInBack",
            opacity : 0,
            translateY: "-100%",
            duration: 300,
        })
      }
    }
  
    ShowContact(){
        if($( ".contact_card_frame" ).hasClass("hidden")){
            this.scrollPosition = $(document).scrollTop()
            $( window ).on("scroll", {scroll:this.scrollPosition} ,this.lockOnCard);
            $( ".contact_card_frame" ).removeClass( "hidden" )
            var tl = anime.timeline();
            tl.add({
                targets: ".contact_card_frame",
                easing: "easeOutCirc",
                opacity : 1,
                translateY: 0,
                duration: 400,
                complete: () => {
                    document.getElementById('contact_card_frame').style.backgroundColor="var(--background)"
                }
            }).add({
                targets: "#icon_btn_contact_close",
                easing: "easeOutBack",
                opacity : 1,
                translateY: 0,
                duration: 400,
            })
        }
    }

    CopyEmail(){
        navigator.clipboard.writeText("gualtiero@mottola.fr");
        this.typecolor = getComputedStyle(document.body).getPropertyValue('--type')
        this.bgcolor = getComputedStyle(document.body).getPropertyValue('--background')
        $(".toast_contact").removeClass("toast_contact_hidden")
        setTimeout(function() {  $(".toast_contact").addClass("toast_contact_hidden") }, 800);
    }

    lockOnCard(event){
        window.scrollTo(0, event.data.scroll);
    }
}