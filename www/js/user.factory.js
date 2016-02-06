(function() {
  'use strict';

  angular
    .module('uPack.factory')
    .factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$http', 'AuthFactory'];
  function UserFactory($http, AuthFactory) {

    var UserAPI = {
      login: login,
      register: register,
      logout: logout,
      getCartItems: getCartItems,
      addToCart: addToCart,
      getPurchases: getPurchases,
      addPurchase: addPurchase
    };

    return UserAPI;

    ////////
    function login(user) {
      return $http.post(base + '/login', user);
    }

    function register(user) {
      return $http.post(base + '/register', user);
    }

    function logout() {
      AuthFactory.deleteAuth();
    }

    function getCartItems() {
      var userId = AuthFactory.getUser()._id;
      return $http.get(base + '/api/v1/user/' + userId + '/cart');
    }

    function addToCart(item) {
      var userId = AuthFactory.getUser()._id;
      return $http.post(base + '/api/v1/user/' + userId + '/cart', item);
    }

    function getPurchases() {
      var userId = AuthFactory.getUser()._id;
      return $http.get(base + '/api/v1/users/' + userId + '/purchases');
    }

    function addPurchase(cart) {
      var userId = AuthFactory.getUser()._id;
      return $http.post(base + '/api/v1/users/' + userId + '/purchases', cart);
    }

  }
})();
