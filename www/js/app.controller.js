(function() {
  'use strict';

  angular
    .module('uPack.controllers')
    .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['$rootScope', '$ionicModel', 'AuthFactory', '$location',
                     'UserFactory', '$scope', 'Loader'];
  function AppCtrl($rootScope, $ionicModel, AuthFactory, $location,
                   UserFactory, $scope, Loader) {
                     $rootScope.$on('showLoginModal', showLoginModal);

                     ///////////
                     function showLoginModal($event, scope,
                        cancelCallback, callback) {
                          $scope.user = {
                            email: '',
                            password: ''
                          };

                          $scope = scope || $scope;
                          $scope.viewLogin = true;
                          $ionicModel
                            .fromTemplateUrl('templates/login.html',
                              {
                                scope: $scope
                              })
                              .then(function(modal) {
                                $scope.modal = modal;
                                $scope.modal.show();

                                $scope.switchTab = function(tab) {
                                  if (tab === 'login') {
                                    $scope.viewLogin = true;
                                  } else {
                                    $scope.viewLogin = false;
                                  }
                                }

                                $scope.hide = function() {
                                  $scope.modal.hide();
                                  if (typeof cancelCallback === 'function') {
                                    cancelCallback();
                                  }
                                }

                                $scope.login = function() {
                                  Loader.showLoading('Authenticating...');
                                }
                                UserFactory.login($scope.user)
                                  .success(function(data) {
                                    data = data.data;
                                    AuthFactory.setUser(data.user);
                                    AuthFactory.setToken({
                                      token: data.token,
                                      expires: data.expires
                                    });

                                    $rootScope.isAuthenticated = true;
                                    $scope.modal.hide();
                                    Loader.hideLoading();
                                    if (typeof callback === 'function') {
                                      callback();
                                    }
                                  })
                                  .error(function(err, statusCode) {
                                    Loader.hideLoading();
                                    Loader.toggleLoadingWithMessage(err.message);
                                  });
                              });
                          $scope.register = function() {
                            Loader.showLoading('Registering...');
                            UserFactory.register($scope.user)
                              .success(function(data) {
                                data = data.data;
                                AuthFactory.setUser(data.user);
                                AuthFactory.setToken({
                                  token: data.token,
                                  expires: data.expires
                                });

                                $rootScope.isAuthenticated = true;
                                Loader.hideLoading();
                                $scope.modal.hide();
                                if (typeof callback === 'function') {
                                  callback();
                                }
                              })
                              .error(function(err, statusCode) {
                                Loader.hideLoading();
                                Loader.toggleLoadingWithMessage(err.message);
                              });
                          }
                        }
                   }
})();
