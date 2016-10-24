angular.module('giphyApp')
       .service('favoriteService', favoriteService);

function favoriteService($http) {

  this.getFavorite = function () {
    return $http.get('/fave')
                .then(function (response) {
                console.log('response', response.data);
                return response.data;
        });
  };

}
