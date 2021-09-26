require('../css/nav_bar.css');
import anime from 'animejs/lib/anime.es.js';

export default class navbar{
    constructor(contactCard,cvCard,footer){
        var template = require("../templates/nav_bar.handlebars");
        var html = template()
        $('.screen_space').append(html);


        $('.side_menu_tab_selector').html(html);
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

        $(".tabs_frame > div, .side_menu_tab_selector > *").on('click', function(e) {
            var prevTabFrame = $(document.body).find(".selected")
            console.log("." + e.currentTarget.className.replace("_tab_selector","_frame"))
            var nextTabFrame =  $("." + e.currentTarget.className.replace("_tab_selector","_frame"))
            if(! $(e.currentTarget).hasClass("tab_is_active")){
                that.switchTabs( prevTabFrame, nextTabFrame, true);
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

        $(".tabs_frame > div").on("mouseenter touchstart",(e) => {
            if(! $(e.currentTarget).hasClass("tab_is_active")){
                $(e.currentTarget).css('text-decoration', 'underline')
            }
        })
        
        $(".tabs_frame > div").on("mouseleave touchmove click",(e) =>  {
            $(e.currentTarget).css("text-decoration", "")
        })

        $( window ).on('scroll',function() {
            if(window.scrollY < 20 ){
                $(".site_bar").addClass("expanded_site_bar")
            }else{
                $(".site_bar").removeClass("expanded_site_bar")
            }
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
        $("."+ tabNotToHide+ "_tab_selector").addClass("tab_is_active")

        const tabs = ['works', 'icons','illustrations','resume']
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
            opacity : 0,
            duration: 150,
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