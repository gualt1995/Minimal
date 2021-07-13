require('../css/tabs.css');
import anime from 'animejs/lib/anime.es.js';

export default class tabs{
    constructor(){
        var template = require("../templates/tabs.handlebars");
        var context = require('../data/tabs.json');
        var html = template(context)
        $('.tabs_frame').html(html);

        $( "#tab_projects" ).addClass( "selected" )
        anime({
            targets: [$( "#underline_bits")[0],$( "#underline_icons")[0]],
            opacity : 0,
            scaleX: 0,
            duration: 0,
        });
        anime({
            targets: $( "#tab_bits_frame, #tab_icons_frame")[0],
            opacity : 0,
            duration: 0,
        });
        $( "#tab_bits_frame" ).hide()
        $( "#tab_icons_frame" ).hide()
        var that = this;

        $( ".tab_wrapper" ).on('click', function(e) {
            if(! $(e.currentTarget).hasClass("selected")){
                var prevTab = $(".tabs_frame").find(".selected")
                var nextTab =  $(e.currentTarget)
                prevTab.removeClass("selected")
                that.hideUnderline(prevTab.find(".underline").attr("id"))
                nextTab.addClass("selected")
                that.showUnderline( $(e.currentTarget).find(".underline").attr("id"))
                that.switchTabs( prevTab.attr("id") + "_frame", nextTab.attr("id") + "_frame" );
            }
        });

        $( ".tab_wrapper" ).on("mouseenter touchstart",(e) => {
            e.currentTarget.getElementsByTagName('span')[0].style.fill="var(--background)"
        })
        $( ".project_link" ).on("mouseleave touchmove click",(e) =>  {
            e.currentTarget.getElementsByTagName('span')[0].style.fill=""
        })

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