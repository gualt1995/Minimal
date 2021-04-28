require('../css/title_screen.css');
import anime from 'animejs/lib/anime.es.js';
import arrow from '../assets/arrow_works.svg';


export default class title_screen{
    constructor()
    {
        anime({
            targets: '.losange',
            opacity: 0,
            rotate: '45deg',
            duration:0,
            background: "rgba(255,255,255,1)",
        });

        anime({
          targets: '.btn_works_animation',
          opacity: 1,
          rotate: '45deg',
          duration:0,
      });

      var works_animation = anime({
          targets: '.btn_works_animation',
          opacity: 0,
          rotate: '45deg',
          scale: 2,
          easing: 'easeInQuart', 
          duration:2000,
          autoplay: false,
          loop: true,
      });
      works_animation.play();

      $("#title_screen_arrow").attr("src", arrow);
      $( ".btn_works_background" ).on('click', () => {
            console.log("hiding title screen")
            works_animation.pause();
            var tl = anime.timeline({
                easing: 'easeOutExpo',
                complete: function(anim) {
                  $( ".title_screen_frame" ).hide();
                }
              });
              tl
              .add({
                targets: '.btn_works_animation',
                opacity: 0, 
                easing: 'linear', 
                duration: 100,
              },0)
              .add({
                targets: '.btn_works',
                opacity: 0, 
                scale: 0,
                easing: 'easeInBack', 
                duration: 300,
              },0)
              .add({
                targets: '.btn_works_background',
                opacity: 0, 
                scale: 0,
                easing: 'easeInBack', 
                duration: 300,
              },0)
              .add({
                targets: '.losange',
                opacity: 1, 
                easing: 'linear', 
                duration: 10,
              },0)
              .add({
                targets:'.title_screen_frame',
                background: "rgba(255,255,255,0)",
                duration:500,
                easing:'easeInQuint'
              },10) // relative offset
              .add({
                targets: '.losange',
                scale: 0,
                rotate: '135deg',
                easing: 'easeInBack', 
                duration: 500, 
                delay: anime.stagger(100, {grid:[11, 7], from: 'center'})
              },110); // absolute offset
              
        });
    }
}

