// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function() {

  'use strict';

  angular
    .module('uPack', [
      'ionic',
      'uPack.factory',
      'uPack.controllers'
    ])

  .run(['$rootScope', 'AuthFactory', activate])
  .config(routes);

  /////////////

  // run method
  function activate($rootScope, AuthFactory) {
    $rootScope.isAuthenticated = AuthFactory.isLoggedIn();

    //utility method
    $rootScope.getNumber = function(num) {
      return new Array(num);
    }
  }

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routes($stateProvider, $urlRouterProvider, $httpProvider) {
    // interceptor
    $httpProvider.interceptors.push('TokenInterceptor');

    $stateProvider

      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',
      controllerAs: 'vm'
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app.book', {
      url: '/book/:bookId',
      views: {
        'menuContent': {
          templateUrl: 'templates/book.html',
          controller: 'BookCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app.cart', {
      url: '/cart',
      views: {
        'menuContent': {
          templateUrl: 'templates/cart.html',
          controller: 'CartCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app.purchases', {
      url: '/purchases',
      views: {
        'menuContent': {
          templateUrl: 'templates/purchases.html',
          controller: 'PurchasesCtrl',
          controllerAs: 'vm'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/browse');
  };
})();
