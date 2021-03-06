require('../css/theme_switcher.css');
import anime from 'animejs/lib/anime.es.js';

export default class theme_switcher{

    constructor(){
        var themes_data = require('../data/themes.json');
        this.template = require("../templates/themes.handlebars");
        this.themes = themes_data['themes']
        this.loadThemeVars(0);
        this.generateThemeButtons();
    }

    generateThemeButtons(){
        $( ".theme_widget_frame" ).remove();
        var currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--theme');
        for (let i = 0, len = this.themes.length; i < len; i++){
            if(this.themes[i]['theme'] != currentTheme){
                var buttonsToAdd = this.template(this.themes[i])
                $( buttonsToAdd ).insertBefore( ".theme_close_btn" );
                $(".site_bar_themes").append(buttonsToAdd);
                $(".side_menu_themes").append(buttonsToAdd);
            }
        }
        $( ".theme_widget" ).on('mouseenter', (e) => {
            console.log("test")
            $(e.currentTarget).addClass("theme_widget_expanded")
        })

        $( ".theme_widget" ).on('mouseleave click', (e) => {
            $(e.currentTarget).removeClass("theme_widget_expanded")
        })    
        $('.theme_widget_frame').on('click',(e) => {
            var themeName = e.currentTarget.id
            this.setTheme(themeName);
        });
    }

    loadThemeVars(themeId){
        let root = document.documentElement;
        for (const [key, value] of Object.entries(this.themes[themeId])) {
            root.style.setProperty('--'+key , this.themes[themeId][key]);
        }
    }

    setTheme(themeToSet){

        var currentThemeName = getComputedStyle(document.documentElement).getPropertyValue('--theme');
        var currentBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background');
        var currentTypeColor = getComputedStyle(document.documentElement).getPropertyValue('--type');
        
        var tl = anime.timeline()
        tl.add({
            targets: '.theme_transition',
            opacity: 0,
            duration: 0,
        }, 0);
        tl.add({
            targets: '.theme_name_display',
            scale: 1,
            duration: 0,
            opacity: 1,
        }, 0);
        tl.add({
            targets: '.theme_new_name_display',
            translateY: - $(window).height(),
            duration: 0
        }, 0)

        $('.theme_name_display').text(currentThemeName)
        $('.theme_new_name_display').text(themeToSet)
        $('.theme_transition').css('background', currentBackgroundColor)
        $('.theme_transition').css('display','flex')
        $('.theme_name_display').css('color', currentTypeColor)

        for (let i = 0, len = this.themes.length; i < len; i++){
            if(themeToSet === this.themes[i]['theme']){
                $('.theme_new_name_display').css('color', this.themes[i]['type'])
                var tl = anime.timeline({
                    complete: () => {
                        $('.theme_transition').hide()
                    }
                });
                tl.add({
                    targets: '.theme_transition',
                    opacity: 1,
                    easing: "easeInSine",
                    duration: 400,
                });
                tl.add({
                    targets: '.theme_transition',
                    easing: "linear",
                    opacity: 1,
                    background: this.themes[i]['background'],
                    duration: 800,
                }, 400);
                tl.add({
                    targets: '.theme_name_display',
                    scale: 0.6,
                    easing: "linear",
                    duration: 200,
                    opacity: 0,
                    complete: () => {
                        this.loadThemeVars(i)
                        this.generateThemeButtons();
                    }
                }, 400)
                tl.add({
                    targets: '.theme_new_name_display',
                    easing: "spring(1, 80, 12, 0)",
                    translateY: 0 
                }, 600) 
                tl.add({
                    targets: '.theme_transition',
                    opacity: 0,
                    easing: "easeOutSine",
                    duration: 400,
                }, '-=400')
            }
        }
    }
}