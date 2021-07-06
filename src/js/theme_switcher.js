require('../css/theme_switcher.css');
import anime from 'animejs/lib/anime.es.js';

export default class theme_switcher{

    constructor(){
        var themes_data = require('../data/themes.json');
        this.themes = themes_data['themes']

        anime({
            targets: '.theme_open',
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "100%",
        });

        this.generateThemeButtons();

        $('.theme_closed').on('click',() => {
            var tl = anime.timeline();
            tl.add({
                targets: '.theme_closed',
                easing: "easeOutCirc",
                opacity : 0,
                duration: 200,
            }).add({
                targets: '.theme_open',
                easing: "easeOutCirc",
                opacity : 1,
                translateY: 0,
                duration: 150,
            }).add({
                targets: '.theme_open > *',
                easing: 'easeInOutSine',
                duration: 300,
                rotate: [
                    { value: -16, },
                    { value: 16, },
                    { value: 16/-2, },
                    { value: 16/2, },
                    { value: 0 }
                ],
                delay: anime.stagger(100),
            }, '-=100')
        });

        $('#theme_close_btn').on('click',() => {
            this.hideThemeMenu();
        });
    }

    generateThemeButtons(){
        $( ".theme_widget" ).remove();
        var currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--theme');
        for (let i = 0, len = this.themes.length; i < len; i++){
            if(this.themes[i]['name'] != currentTheme){
                $( "<div  style=\"background-color:" + this.themes[i]['background'] + ";\" class=\"theme_widget\" id=\""+ this.themes[i]['name'] +"\"> <div></div> </div>" ).insertBefore( ".theme_close_btn" );
            }
        }
        $('.theme_widget').on('click',(e) => {
            var themeName = e.currentTarget.id
            this.setTheme(themeName);
        });
    }

    setTheme(themeToSet){
        let root = document.documentElement;
        for (let i = 0, len = this.themes.length; i < len; i++){
            if(themeToSet === this.themes[i]['name']){
                root.style.setProperty('--theme', this.themes[i]['name']);
                root.style.setProperty('--background', this.themes[i]['background']);
                root.style.setProperty('--type', this.themes[i]['type']);
                root.style.setProperty('--accent', this.themes[i]['accent']);
                root.style.setProperty('--hover', this.themes[i]['hover']);
                root.style.setProperty('--selected', this.themes[i]['selected']);
            }
        }
        this.hideThemeMenu();
        this.generateThemeButtons();
    }
    
    hideThemeMenu(){
        var tl = anime.timeline();
        tl.add({
            targets: '.theme_open',
            easing: "easeOutCirc",
            opacity : 0,
            translateY: "100%",
            duration: 150,
        }).add({
            targets: '.theme_closed',
            easing: "easeOutCirc",
            opacity : 1,
            duration: 200,
        })
    }
}