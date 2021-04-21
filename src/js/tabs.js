require('../css/tabs.css');
import anime from 'animejs/lib/anime.es.js';

export default class tabs{
    constructor(){
        $( "#tab_project" ).addClass( "selected" )
        anime({
            targets: $( "#underline_bits")[0],
            opacity : 0,
            scaleX: 0,
            duration: 0,
        });
        anime({
            targets: $( "#bits_frame")[0],
            opacity : 0,
            scale: 0.95,
            duration: 0,
        });
        $( "#bits_frame" ).hide()
        console.log("created tabs")
        var that = this;
        $( "#tab_project" ).on('click', function() {
            if(!$( "#tab_project" ).hasClass("selected")){
                console.log("switching to projects tab")
                $( "#tab_project" ).addClass( "selected" )
                $( "#tab_bit" ).removeClass( "selected" )
                that.hideUnderline("underline_bits")
                that.showUnderline("underline_projects")
                that.switchTabs("bits_frame","projects_frame")

            }
        });
        $( "#tab_bit" ).on('click', function() {
            if(!$( "#tab_bit" ).hasClass("selected" )){
                console.log("switching to bits tab")
                $( "#tab_bit" ).addClass( "selected" )
                $( "#tab_project" ).removeClass( "selected")
                that.hideUnderline("underline_projects")
                that.showUnderline("underline_bits")
                that.switchTabs("projects_frame","bits_frame")
            }
        });
    }

    hideUnderline(id) {
        anime({
            targets: $( "#"+id)[0],
            opacity : 0,
            scaleX: 0,
            easing: 'easeInElastic(6, 1)',
            duration: 400
        });
    }

    showUnderline(id) {
        anime({
            targets: $( "#"+id)[0],
            opacity : 1,
            scaleX: 1,
            easing: 'easeOutElastic(5, 1)',
            duration: 400,
            delay: 100,
        });
    }

    switchTabs(startTabId, endTabId){
        anime({
            targets: $( "#"+startTabId)[0],
            opacity : 0,
            duration: 100,
            easing: 'linear',
            complete: function() {
                $( "#"+startTabId ).hide()
                $( "#"+endTabId ).show()
                anime({
                    targets: $( "#"+endTabId )[0],
                    opacity : 1,
                    duration: 200,
                    easing: 'linear',
                });

            }
        });
    }
}