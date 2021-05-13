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


new tabs();
new title_screen();
var theCvCard = new cvCard();
var theContactCard = new contactCard();
new menuFab(theContactCard,theCvCard); 
new footer(theContactCard,theCvCard); 
new bits();

new project();
new tizio();
new martingale();
new k7();
