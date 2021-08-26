require('../css/nav_bar.css');
import anime from 'animejs/lib/anime.es.js';

export default class navbar{
    constructor(contactCard,cvCard,footer){
        var template = require("../templates/tabs.handlebars");
        navbar.tabJsonData = require('../data/tabs.json');
        var html = template(navbar.tabJsonData)
        $('.tabs_frame').html(html);
        $('.side_menu_tab_selector').html(html);

        if(window.location.search){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const tab = urlParams.get('tab')
            this.hideTabsExcept(tab.replace("_frame", ""))

        }else{
            history.replaceState({tab: "tab_projects_frame"}, "tab_projects_frame", "?tab=tab_projects_frame");
            this.hideTabsExcept("tab_projects")
        }
        var that = this;

        $(".tabs_frame > *, .side_menu_tab_selector > *").on('click', function(e) {
            var prevTab = $(document.body).find(".selected")
            var nextTab =  $("#" + e.currentTarget.className + "_frame")
            if(! nextTab.hasClass("selected")){
                that.switchTabs( prevTab, nextTab, true);
            }
        });

        $( "#side_menu_btn_resume" ).on('click',function() {
            cvCard.ShowCv()
        })
        $( "#side_menu_btn_contact" ).on('click',function() {
            contactCard.ShowContact()
        })
        $( "#side_menu_btn_share" ).on('click',function() {
            footer.share()
        })

        $(".tabs_frame > *, .side_menu_tab_selector > *").on("mouseenter touchstart",(e) => {
            var nextTab =  $("#" + e.currentTarget.className + "_frame")
            if(! nextTab.hasClass("selected")){
                $(e.currentTarget).css("color", "var(--hover)")
            }
        })
        
        $(".tabs_frame > *, .side_menu_tab_selector > *").on("mouseleave touchmove click",(e) =>  {
            var nextTab =  $("#" + e.currentTarget.className + "_frame")
            if(! nextTab.hasClass("selected")){
                $(e.currentTarget).css("color", "")
            }
        })

        window.onpopstate = function(event) {
            if(event.state["tab"]){
                var prevTab = $(document.body).find(".selected")
                var nextTab = $("#" + event.state["tab"])
                that.switchTabs( prevTab, nextTab, false);
            }else{
                window.history.back();
            }
        } 
    }

    hideTabsExcept(tabNotToHide){
        $("#" + tabNotToHide + "_frame" ).addClass( "selected" )
        $("."+ tabNotToHide).css("background", "var(--type)")
        $("."+ tabNotToHide).css("color", "var(--background)")
        navbar.tabJsonData["tab"].forEach(element => {
            if( element["tab_id"] != tabNotToHide ){
                $( "#" + element["tab_id"] + "_frame" ).hide()
                $( "#" + element["tab_id"] + "_frame" ).css("opacity", "0")
            }
        });
    }


    switchTabs(prevTab, nextTab, pushHistory){
        prevTab.removeClass("selected")
        nextTab.addClass("selected")
       
        var prevTabId = prevTab.attr("id")
        var nextTabId = nextTab.attr("id") 

        if(pushHistory){
            history.pushState({tab: nextTabId}, nextTabId, "?tab="+ nextTabId)
        }

        var prevTabButtonClass = "." + prevTabId.replace('_frame','');
        var nextTabButtonClass= "." + nextTabId.replace('_frame','');
        $(nextTabButtonClass).css("background", "var(--type)")
        $(nextTabButtonClass).css("color", "var(--background)")
        $(prevTabButtonClass).css("background", "")
        $(prevTabButtonClass).css("color", "var(--type)")

        anime({
            targets: $( "#"+prevTabId)[0],
            opacity : 0,
            duration: 100,
            easing: 'linear',
            complete: function() {
                $( "#"+prevTabId ).hide()
                $( "#"+nextTabId ).show()
                anime({
                    targets: $( "#"+nextTabId )[0],
                    opacity : 1,
                    duration: 200,
                    easing: 'linear',
                });

            }
        });
    }
}