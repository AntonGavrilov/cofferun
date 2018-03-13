(function(window){
  'use strict';

  var App = window.App || {};

  var $ = window.jQuery;

  function RemoteDataSore(url){
    if(!url){
      throw new Error('No remote URL suppled.');
    }
    this.serverUrl = url;
  }

  RemoteDataSore.prototype.add = function(key, val){
    $.post(this.serverUrl, val, function(serverResponse){
      console.log(serverResponse);
    })
  }

 App.RemoteDataSore = RemoteDataSore;
 window.App = App;
})(window);
