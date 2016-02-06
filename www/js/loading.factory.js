(function() {

  'use strict';

  angular
    .module('uPack.factory')
    .factory('Loader', [
      '$ionicLoading',
      '$timeout',
      Loader
    ]);

  function Loader($ionicLoading, $timeout) {

    var LoaderAPI = {
      showLoading: showLoading,
      hideLoading: hideLoading,
      toggleLoadingWithMessage: toggleLoadingWithMessage
    };

    return LoaderAPI;

    ///////////

    function showLoading(text) {
      text = text || 'Loading...';
      $ionicLoading.show({
        template: text
      });
    }

    function hideLoading() {
      $ionicLoading.hide();
    }

    function toggleLoadingWithMessage(text, timeout) {
      $rootScope.showLoading(text);

      $timeout(function() {
        $rootScope.hideLoading();
      }, timeout || 3000);
    }
  }
})();
