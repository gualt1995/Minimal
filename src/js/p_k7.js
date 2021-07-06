require('../css/p_k7.css');

import neon_dark from '../svg/neon_dark.svg';
import neon_light from '../svg/neon_light.svg';



export default class k7{
    constructor(){  
        $(".wip_img").attr("src", neon_dark);
        this.themeChangeObserver();
    }


    themeChangeObserver(){   
        var observer = new MutationObserver(() => {
            var currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--theme');
            if(currentTheme === 'night'){
                $(".wip_img").attr("src", neon_dark);
            }else{
                $(".wip_img").attr("src", neon_light);
            }  
        });
        
        var target = document.getElementsByClassName('theme_open')[0]   
        observer.observe(target, { childList : true});
    }
}