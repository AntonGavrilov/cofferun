(function(window){
  'use strict';

  var App = window.App || {};

  function Track(trackId, db){
    this.TackId = trackId;
    this.db = db;
  }

    Track.prototype.createOrder = function(order){
      this.db.add(order.EmailAddress, order);
      console.log('Adding order for ' + order.EmailAddress);
    }

    Track.prototype.deliverOrder = function(customerId){
      this.db.remove(customerId);
      console.log('Delivering order for ' + customerId);
    }

    Track.prototype.printOrders = function(){

      console.log('Track #' + this.TackId + ' has pending orders:')
      var customerIdArray = Object.keys(this.db.getAll());
      customerIdArray.forEach(function(id){
        console.log(this.db.get(id));
      }, this);
    }

  App.Track = Track;
  window.App = App;

})(window);
