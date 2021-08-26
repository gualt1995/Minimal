require('../css/page_wide.css');
import anime from 'animejs/lib/anime.es.js';

import navbar from './nav_bar.js';
import cvCard from './cv_card.js';
import contactCard from './contact_card.js';
import footer from './footer.js';
import title_screen from './title_screen.js';
import bits from './bits.js';
import theme from './theme_switcher';

import project from './project.js';
import martingale from './p_martingale.js';
import tizio from './p_tizio.js';
import onair from './p_onair.js';
import icons from './icons.js';

//import { datadogRum } from '@datadog/browser-rum';

/*datadogRum.init({
    applicationId: 'e983b6d8-44f6-4b4a-9eb2-4779bce65db4',
    clientToken: 'pub41de64be7532355e415f738c0a6fa36c',
    site: 'datadoghq.com',
    service:'rum-test-app',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true
});*/

new title_screen();
var theCvCard = new cvCard();
var theContactCard = new contactCard();
var theFooter = new footer(theContactCard,theCvCard); 
new navbar(theContactCard,theCvCard,theFooter);
new bits();
new icons();
new theme();

new project();
new tizio();
new martingale();
new onair();

function shake(idTarget){
    var xMax = 16;
    anime({
        targets: "#" + idTarget + " > svg",
        easing: 'easeInOutSine',
        duration: 300,
        rotate: [
            { value: xMax * -1, },
            { value: xMax, },
            { value: xMax/-2, },
            { value: xMax/2, },
            { value: 0 }
        ],
    });
}

$( ".icon_btn" ).on('mouseenter touchstart',function(e) {
    shake(e.currentTarget.id)
})