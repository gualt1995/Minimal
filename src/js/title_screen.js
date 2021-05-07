require('../css/title_screen.css');
import anime from 'animejs/lib/anime.es.js';
import arrow from '../assets/arrow_works.svg';


export default class title_screen{
  constructor(){
    $("#title_screen_arrow").attr("src", arrow);
    anime({
      targets: '.title_btn_works_halo',
      opacity: 1,
      rotate: '45deg',
      duration:0,
    });
    
    anime({
      targets: '.title_btn_works_outline',
      opacity: 1,
      rotate: '45deg',
      duration:0,
    });

    //this is ugly, but it does not mess with the scrollbar, overlay blocks the jumpy page anyways
    $( window ).on("scroll", this.lockToTop);

    this.works_animation = anime({
        targets: '.title_btn_works_halo',
        opacity: 0,
        rotate: '45deg',
        scale: 2,
        easing: 'easeInQuart', 
        duration:2000,
        autoplay: false,
        loop: true,
    });
    this.works_animation.play();

    //html structure forces several classes so that we do not inherit the rotation from the background
    $( ".title_btn_works_outline, .title_text_gualti, .title_arrow" ).on('click', () => {
      this.startupAnimation()
    });
  }

  startupAnimation(){
    $( window ).off("scroll",this.lockToTop)
    this.works_animation.pause();
    var tl = anime.timeline({
      complete: function(anim) {
        $( ".title_screen_frame" ).hide();
      }
    });
    tl
    .add({
      targets: '.title_arrow,  .title_text_gualti',
      opacity: 0, 
      scale:0,
      easing: 'easeOutExpo',   
      duration: 300,
    },0)
    .add({
      targets: '.title_btn_works_halo',
      opacity: 0, 
      easing: 'linear', 
      duration: 100,
    },0)
    .add({
      targets: '.title_btn_works_outline',
      rotate:[
        {value: '-10deg', easing:"linear",duration:100},
        {value: '45deg', easing:"spring(1, 80, 10, 20)",delay: 200},
      ],
      scale:[
        {value: 0.9, easing:"linear",duration:100},
        {value: 1, easing:"easeOutBack",delay: 200},
      ],
      boxShadow:[
        {value: "8px 8px 9px rgba(0, 0, 0, 0.25)", easing:"linear", duration:100, delay: 250},
      ],
    },0)
    .add({
      targets: '.title_btn_works',
      translateY:[
        {value: -$( window ).height(), easing:"easeOutExpo",duration:600,delay:900},
      ],
    },0)
    .add({
      targets: '.title_purse_bottom',
      translateY:[
        {value: 1, easing:'easeOutExpo',duration:100},
        {value: "100%", easing:"easeOutExpo",duration:300,delay:400},
      ],
    },100)
    .add({
      targets: '.title_purse_top',
      translateY:[
        {value: "-100%", easing:"easeOutExpo",duration:300,delay:800},
      ],
    },100)
  }

  lockToTop(){
    window.scrollTo(0, 0);
  }
}

