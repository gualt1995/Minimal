require('../css/project.css');
import mugge from '../thumbnails/Mugge.png';
import lexon from '../thumbnails/Lexon.png';
import saab from '../thumbnails/Saab.png';
import logs from '../thumbnails/Logs.png';
import chrome from '../thumbnails/Chrome.png';

export default class project{
    constructor(){  
        var template = require("../templates/project.handlebars");
        var website = require('../data/projects.json');
        var html = template(website)
        $('.works_frame').html(html)

        $(".img_on_air").attr("src", mugge);
        $(".img_on_chromium").attr("src", chrome);
        $(".img_logs").attr("src", saab);
        $(".img_martingale").attr("src", lexon);
        $(".img_tizio").attr("src", logs);
        
    }

}