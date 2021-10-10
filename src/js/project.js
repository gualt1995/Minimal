require('../css/project.css');
import mugge from '../thumbnails/Mugge.png';
import logs from '../thumbnails/Logs.png';
import onAir from '../thumbnails/On_air.png';
import chrome from '../thumbnails/Chrome.png';
import wip from '../thumbnails/Wip.png';


export default class project{
    constructor(){  
        var template = require("../templates/project.handlebars");
        var website = require('../data/projects.json');
        var html = template(website)
        $('.works_frame').html(html)

        $(".img_on_air").attr("src", onAir);
        $(".img_on_chromium").attr("src", chrome);
        $(".img_logs").attr("src", logs);
        $(".img_martingale").attr("src", mugge);
        $(".img_wip").attr("src", wip);
        
    }

}