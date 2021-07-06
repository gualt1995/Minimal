require('../css/menu_fab.css');
import anime from 'animejs/lib/anime.es.js';


export default class menuFab{
    constructor(contactCard,cvCard){
        $( "#menu_fab" ).addClass("closed")
        anime({
            targets: $( "#menu_btn_close")[0],
            rotate: 45,
            opacity : 0,
        });
        anime({
            targets: $("#menu_btn_resume")[0],
            translateX: "-100%",
            opacity : 0,
            duration: 1,       
        })
        anime({
            targets: $("#menu_btn_contact")[0],
            translateX: "-100%",
            opacity : 0,
            duration: 1,
        })
        $( "#menu_fab" ).on('mouseenter touchstart',function() {
            that.Shake("menu_btn_dots")
            that.Shake("menu_btn_close")
        })
        $("#menu_btn_contact").css("pointer-events","none");
        $("#menu_btn_resume").css("pointer-events","none");
        var that = this
        $( "#menu_fab" ).on('click',function() {
            if($( "#menu_fab" ).hasClass("closed")){
                that.showMenu()
            }else{
                that.hideMenu()
            }
        });
        $( "#menu_btn_resume" ).on('click',function() {
            cvCard.ShowCv()
            that.hideMenu()
        })
        $( "#menu_btn_contact" ).on('click',function() {
            contactCard.ShowContact()
            that.hideMenu()
        })

        $(window).on('scroll',function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                $( ".menu_btn_frame" ).addClass("hidden")
                that.hideMenu()
                anime({
                    targets: ".menu_btn_frame",
                    translateX: "-25%",
                    easing: "easeInOutSine",
                    duration: 400,
                })
            }else{
                if( $( ".menu_btn_frame" ).hasClass("hidden")){
                    $( ".menu_btn_frame" ).removeClass("hidden")
                    anime({
                        targets: ".menu_btn_frame",
                        translateX: "0%",
                        easing: "easeInOutSine",
                        duration: 400,
                    })
                }
            }
         });
        
    }

    showMenu(){
        $( "#menu_fab" ).removeClass("closed")
        var easing = 'spring(1, 100, 10, 5)'
        $("#menu_btn_contact").css("pointer-events","auto");
        $("#menu_btn_resume").css("pointer-events","auto");
        anime({
            targets: $( "#menu_btn_resume")[0],
            translateX: 0,
            opacity: 1,
            easing: easing
        })
        anime({
            targets: $( "#menu_btn_contact")[0],
            translateX: 0,
            opacity : 1,
            delay:200,
            easing: easing
        })
        anime({
            targets: $( "#menu_btn_dots")[0],
            rotate: 45,
            opacity : 0,
            easing: easing
        });
        anime({
            targets: $( "#menu_btn_close")[0],
            rotate: 0,
            opacity : 1,
            easing: easing
        });
    }

    hideMenu(){
        console.log(" is being closed")
        $( "#menu_fab" ).addClass("closed")
        $("#menu_btn_contact").css("pointer-events","none");
        $("#menu_btn_resume").css("pointer-events","none");
        var easing = 'spring(1, 100, 10, 5)'
        anime({
            targets: $( "#menu_btn_resume")[0],
            translateX: "-100%",
            delay:200,
            opacity: 0,
            easing: easing
        })
        anime({
            targets: $( "#menu_btn_contact")[0],
            translateX: "-100%",
            opacity : 0,
            easing: easing
        })
        anime({
            targets: $( "#menu_btn_dots")[0],
            rotate: 0,
            opacity : 1,
            easing: easing
        });
        anime({
            targets: $( "#menu_btn_close")[0],
            rotate: 45,
            opacity : 0,
            easing: easing
        });
    }

    Shake(idTarget){
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
}