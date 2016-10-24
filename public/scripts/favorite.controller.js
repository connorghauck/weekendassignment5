angular.module('giphyApp')
       .controller('faveController', faveController);

function faveController(fave) {

    var main = this;
    main.faveResults;
    fave.getfavorite(main).then(function (databaseInfo) {
    main.faveResults = databaseInfo;
    });

}
