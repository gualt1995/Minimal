require('../css/p_k7.css');

import neon_dark from '../svg/neon_dark.svg';
import neon_light from '../svg/neon_light.svg';
import neon_soviet from '../svg/neon_soviet.svg';


export default class onair{
    constructor(){  
        $(".wip_img").attr("src", neon_dark);
        this.themeChangeObserver();
    }

    themeChangeObserver(){   
        var observer = new MutationObserver(() => {
            var currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--theme');
            if(currentTheme === 'night' || currentTheme === 'matrix'){
                $(".wip_img").attr("src", neon_dark);
            }else if(currentTheme === 'metro'){
                $(".wip_img").attr("src", neon_light);
            }else{
                $(".wip_img").attr("src", neon_soviet);
            } 
        });
        
        var target = document.getElementsByClassName('theme_open')[0]   
        observer.observe(target, { childList : true});
    }
}