require('../css/page_wide.css');

import tabs from './tabs.js';
import cvCard from './cv_card.js';
import contactCard from './contact_card.js';
import menuFab from './menu_fab.js';
import footer from './footer.js';
import title_screen from './title_screen.js';
import bits from './bits.js';

import project from './project.js';
import martingale from './p_martingale.js';
import tizio from './p_tizio.js';
import k7 from './p_k7.js';
import icons from './icons.js';

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'e983b6d8-44f6-4b4a-9eb2-4779bce65db4',
    clientToken: 'pub41de64be7532355e415f738c0a6fa36c',
    site: 'datadoghq.com',
    service:'rum-test-app',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true
});


new tabs();
new title_screen();
var theCvCard = new cvCard();
var theContactCard = new contactCard();
new menuFab(theContactCard,theCvCard); 
new footer(theContactCard,theCvCard); 
new bits();
new icons();

new project();
new tizio();
new martingale();
new k7();