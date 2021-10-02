require('../css/page_wide.css');

import buttons from './buttons.js';

import navbar from './nav_bar.js';
import cvCard from './cv_card.js';
import contactCard from './contact_card.js';
import footer from './footer.js';
import title_screen from './title_screen.js';
import illustrations from './illustrations.js';
import theme from './theme_switcher';

import project from './project.js';
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
new navbar(theContactCard,theFooter);
new illustrations();
new icons();
new theme();
new project();
new buttons();
