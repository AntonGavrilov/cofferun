(function(window){
  'use strict';


  var App = window.App || {};
  var data = {}

  function Datastore(){
  }

    Datastore.prototype.add = function(key, val){
      data[key] = val;
    }

    Datastore.prototype.get = function(key){
      return data[key];
    }
    Datastore.prototype.getAll = function(){
      return data;
    }

    Datastore.prototype.remove = function(key){
      delete data[key];
    }


 App.DataStore = Datastore;
 window.App = App;
})(window);
