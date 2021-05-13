require('../css/p_martingale.css');

export default class martingale{
    constructor(){
        var template = require("../templates/book.handlebars");
        var bookv1 = {
            "title" : "Volume 1",
            "book_id": "vitals_book_v1"
        }
        var bookv2 = {
            "title" : "Volume 2",
            "book_id": "vitals_book_v2"
        }
        var html = template(bookv1) + template(bookv2)
        $('.vitals_books_container').html(html)

        $("#vitals_book_v1").on('click',function(e){
            window.open("https://www.editions-ellipses.fr/accueil/10660-la-martingale-volume-1-2e-edition-9782340040953.html");    
        });
        
        $("#vitals_book_v2").on('click',function(e){
            window.open("https://www.editions-ellipses.fr/accueil/10661-la-martingale-volume-2-2e-edition-9782340040960.html");    
        });
    }
}