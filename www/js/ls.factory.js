(function() {

  'use strict';

  angular
    .module('uPack.factory')
    .factory('LSFactory', LSFactory);

  function LSFactory() {
    var LSAPI = {

      clear: clear,
      get: get,
      set: set,
      delete: remove,
      getAll: getAll
    };

    return LSAPI;

    //////////

    function clear() {
      return localStorage.clear();
    }

    function get(key) {
      return JSON.parse(localStorage.getItem(key));
    }

    function set(key, data) {
      return localStorage.setItem(key, JSON.stringify(data));
    }

    function remove(key) {
      return localStorage.removeItem(key);
    }

    function getAll() {
      var books = [];
      var items = Object.keys(localStorage);

      for (var i = 0; i < items.length; i++) {
        if (items[i] !== 'user' || items[i] != 'token') {
          books.push(JSON.parse(localStorage[items[i]]));
        }
      }

      return books;
    }
  }
})();
