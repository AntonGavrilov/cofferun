(function(window){
  'use strict';


  var App = window.App || {};

  function Datastore(){
    this.data = {};
  }

    Datastore.prototype.add = function(key, val){
      this.data[key] = val;
    }
    Datastore.prototype.get = function(key){
      return this.data[key];
    }
    Datastore.prototype.getAll = function(){
      return this.data;
    }

    Datastore.prototype.remove = function(key){
      delete this.data[key];
    }


 App.DataStore = Datastore;
 window.App = App;
})(window);
