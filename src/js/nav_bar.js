require('../css/nav_bar.css');
import anime from 'animejs/lib/anime.es.js';

export default class navbar{
    constructor(contactCard,footer){
        var template = require("../templates/nav_bar.handlebars");
        var data = require('../data/tabs_names.json');
        var html = template(data)
        $('.screen_space').append(html);
        if(window.location.search){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const tab = urlParams.get('tab')
            this.hideTabsExcept(tab)

        }else{
            history.replaceState({tab: "works"}, "works", "?tab=works");
            this.hideTabsExcept("works")
        }
        var that = this;

        $(".tabs_frame > div, .side_menu_tab_frame > div").on('click', function(e) {
            var prevTabFrame = $(document.body).find(".selected")
            var nextTabFrame =  $("." + e.currentTarget.className.replace("_tab_selector","_frame"))
            console.log("." + e.currentTarget.className.replace("_tab_selector","_frame"))
            $(".side_menu").addClass("side_menu_hidden")
            if(! $(e.currentTarget).hasClass("tab_is_active")){
                that.switchTabs( prevTabFrame, nextTabFrame, true);
            }
        });

        $(".side_menu_close_icon").on('click',function() {
            $(".side_menu").addClass("side_menu_hidden");
        })

        $( ".site_bar_logo_frame" ).on('click',function() {
            $(".side_menu").toggleClass( "side_menu_hidden" );
        })

        $( "#side_menu_btn_contact" ).on('click',function() {
            $(".side_menu").addClass("side_menu_hidden")
            contactCard.ShowContact()
        })
        $( "#side_menu_btn_share" ).on('click',function() {
            $(".side_menu").addClass("side_menu_hidden")
            footer.share()
        })

        $( ".side_menu" ).on('click',function(e) {
            if($(e.target).hasClass("side_menu")){
                $(".side_menu").addClass("side_menu_hidden")
            }
        })

        $(".tabs_frame > div").on("mouseenter touchstart",(e) => {
            if(! $(e.currentTarget).hasClass("tab_is_active")){
                $(e.currentTarget).css('text-decoration', 'underline')
            }
        })
        
        $(".tabs_frame > div").on("mouseleave touchmove click",(e) =>  {
            $(e.currentTarget).css("text-decoration", "")
        })

        $( window ).on('scroll',function() {
            if(window.scrollY < 20 && window.innerWidth > 768){
                $(".site_bar").addClass("expanded_site_bar")
            }else{
                $(".site_bar").removeClass("expanded_site_bar")
            }
            $(".side_menu").addClass("side_menu_hidden");   
        });

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
        $("." + tabNotToHide + "_frame" ).addClass( "selected" )
        $("."+ tabNotToHide + "_tab_selector").addClass("tab_is_active")

        const tabs = ['works', 'icons','vector','resume']
        tabs.forEach(item => {
            if( item != tabNotToHide ){
                $( "." + item + "_frame" ).hide()
                $( "." + item + "_frame" ).css("opacity", "0")
            }
        });
    }

    switchTabs(prevTabFrame, nextTabFrame, pushHistory){
        prevTabFrame.removeClass("selected")
        nextTabFrame.addClass("selected")

        var prevTabId = prevTabFrame.attr("id")
        var nextTabId = nextTabFrame.attr("id") 

        if(pushHistory){
            history.pushState({tab: nextTabId}, nextTabId, "?tab="+ nextTabId)
        }
        var prevTabButtonClass = "." + prevTabId + "_tab_selector";
        var nextTabButtonClass= "." + nextTabId + "_tab_selector";

        var tl = anime.timeline({
            easing: 'easeOutCirc',
        })

        tl.add({
            targets: nextTabButtonClass, 
            translateY: "-100%",
            opacity:0,
            duration:200,
        },0)

        tl.add({
            targets: prevTabButtonClass, 
            translateY: 0,
            opacity:0,
            duration:200,
            complete: function() {
                $(nextTabButtonClass).addClass("tab_is_active")
                $(prevTabButtonClass).removeClass("tab_is_active")
            }
        },0)
        
        tl.add({
            targets: prevTabButtonClass, 
            translateY: 0,
            opacity:1,
            duration:200,
        },200)
        tl.add({
            targets: nextTabButtonClass, 
            translateY: 0,
            opacity:1,
            duration:200,
        },200)

      
        anime({
            targets: "#"+prevTabId,
            opacity : 0.4,
            duration: 150,
            easing: 'linear',
            complete: function() {
                $( "#"+prevTabId ).hide()
                $( "#"+nextTabId ).show()
                anime({
                    targets: $( "#"+nextTabId )[0],
                    opacity : 1,
                    duration: 100,
                    easing: 'linear',
                });
            }
        });
    }
}