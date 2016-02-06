(function() {
  'use strict';

  angular
    .module('uPack.factory')
    .factory('TokenInterceptor', [
      '$q',
      'AuthFactory',
      TokenInterceptor
    ]);

  function TokenInterceptor($q, AuthFactory) {
    var SERVICE = {
      request: request,
      response: response
    };

    return SERVICE;

    /////////

    function request(config) {
      config.headers = config.headers || {};
      var token = AuthFactory.getToken();
      var user = AuthFactory.getUser();

      if (token && user) {
        config.headers['X-Access-Token'] = token.token;
        config.headers['X-Key'] = user.email;
        config.headers['Content-Type'] = "application/json";
      }

      return config || $q.when(config);
    }

    function response(res) {
      return res || $q.when(res);
    }
  }
})();
