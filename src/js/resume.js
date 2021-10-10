require('../css/resume.css');
import anime from 'animejs/lib/anime.es.js';

export default class cvCard{
    constructor(){
        var template = require("../templates/experience.handlebars");
        var context = require('../data/experiences.json');
        var html = template(context)   
        $('.resume_frame').html(html);
    }
}