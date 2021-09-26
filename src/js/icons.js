require('../css/icons.css');

import anime from 'animejs/lib/anime.es.js';

export default class icons{
    constructor(){
        var template = require("../templates/icons.handlebars");
        var context = require('../data/icons.json');
        var html = template(context)
        $('.icons_frame').html(html);
        const icon_style = ['filled', 'outlined']

        $('.icon_group_list').each(function(){
            var icon_group_list = $(this)
            var buttons = icon_group_list.siblings( ".icon_header" ).find(".icon_btn_stlye_frame").children()
            buttons.eq(0).addClass("contained_button_selected")
            if(icon_group_list.children().length > 1){
                icon_group_list.children().eq(1).hide() //hide the second icon group.
                icon_group_list.siblings( ".icon_header" ).find(".icon_btn_stlye_frame").children().eq(2).hide()
                buttons.on('click',function() {
                    if( !$(this).hasClass("contained_button_selected")){
                        //change the button styles
                        $(this).addClass("contained_button_selected")
                        $(this).siblings().removeClass("contained_button_selected")
                        //update the icons
                        icon_group_list.children().each(function(){
                            if($(this).is(":hidden")){
                                $(this).show()
                            }else{
                                $(this).hide()
                            }
                        })
                    }
                })
            }else{
                //hide useless button when only one icon group
                buttons.eq(1).hide()
            }
        })

        $( ".icon_display" ).on('mouseenter touchstart', (e) => {
            $(e.currentTarget).addClass("icon_display_selected")
        })

        $( ".icon_display" ).on('mouseleave touchmove', (e) => {
            $(e.currentTarget).removeClass("icon_display_selected")
        })

        $( ".icon_display" ).on("click",(e) => {
            this.showIconPreview(e)        
        })

        $( ".Icon_preview_close_btn" ).on("click",(e) => {
            this.hideIconPreview();        
        })

        $( ".icons_preview_frame" ).on("click",(e) => {
            if($(e.target).hasClass("icons_preview_frame")){
                this.hideIconPreview();        
            }
        })

        $( window ).on('scroll',() => {
           this.hideIconPreview();
        });
    }

    showIconPreview(e){
        var pointerX = e.clientX
        var pointerY = e.clientY
        $(".icons_preview_frame").addClass("icons_preview_frame_active")
        $(".icon_preview_container > span").html($(e.currentTarget).children("span").html())
        $(".icon_preview_container > svg > path").attr("d",$(e.currentTarget).find("path").attr("d"))

        var tl = anime.timeline({
            easing: 'easeOutCirc',
            targets: '.icons_preview_frame',
        })

        tl.add({
            translateX: pointerX - (window.innerWidth/2),
            translateY: pointerY- (window.innerHeight/2),
            scale:0,
            opacity:0.5,
            duration:0,
        });

        tl.add({
            translateX: 0,
            translateY: 0,
            scale:1,
            opacity:1,
            duration:400,
        });
    }
    
    hideIconPreview(){
        anime({
            easing: 'easeOutCirc',
            targets: '.icons_preview_frame',
            opacity: 0,
            duration: 200,
            complete: () => {
                $(".icons_preview_frame").removeClass("icons_preview_frame_active")
            }
        })
    }
}