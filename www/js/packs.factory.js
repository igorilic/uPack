(function() {

  'use strict';

  angular
    .module('uPack.factory')
    .factory('PacksFactory', PacksFactory);

  PacksFactory.$inject = ['$http'];
  function PacksFactory($http) {
    var perPage = 30;

    var API = {
      get: get
    };

    return API;

    //////////
    function get(page) {
      return $http.get(base + '/api/v1/books/' + page + '/' + perPage);
    }
  }
})();
