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
            if(this.themes[i]['theme'] != currentTheme){
                $( "<div style=\"background-color:" + this.themes[i]['background'] + ";\"class=\"theme_widget\" id=\""+ this.themes[i]['theme'] +"\"> <div  style=\"background-color:"+  this.themes[i]['type'] +"\";></div> </div>" ).insertBefore( ".theme_close_btn" );
            }
        }
        $('.theme_widget').on('click',(e) => {
            var themeName = e.currentTarget.id
            this.setTheme(themeName);
        });
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

        let root = document.documentElement;
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
                        for (const [key, value] of Object.entries(this.themes[i])) {
                            root.style.setProperty('--'+key , this.themes[i][key]);
                            console.log(key,value)
                          }
                        this.hideThemeMenu();
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