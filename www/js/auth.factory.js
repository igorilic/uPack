
(function() {

  'use strict';

  angular
    .module('uPack.factory')
    .factory('AuthFactory', [
      'LSFactory',
      AuthFactory
    ]);

    function AuthFactory(LSFactory) {
      var userKey = 'user';
      var tokenKey = 'token';

      var AUTHAPI = {
        isLoggedIn: isLoggedIn,
        getUser: getUser,
        setUser: setUser,
        getToken: getToken,
        setToken: setToken,
        deleteAuth: deleteAuth
      }

      return AUTHAPI;

      //////////////

      function isLoggedIn() {
        return this.getUser() === null ? false : true;
      }

      function getUser() {
        return LSFactory.get(userKey);
      }

      function setUser(user) {
        return LSFactory.set(userKey, user);
      }

      function getToken() {
        return LSFactory.get(tokenKey);
      }

      function setToken(token) {
        return LSFactory.set(tokenKey, token);
      }

      function deleteAuth() {
        LSFactory.delete(userKey);
        LSFactory.delete(tokenKey);
      }
    }
})();
