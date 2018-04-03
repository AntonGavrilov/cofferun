(function(window) {
  'use strict';

  var App = window.App || {};

  function Track(trackId, db) {
    this.TackId = trackId;
    this.db = db;
  }

  Track.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order);
  }

  Track.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  }

  Track.prototype.printOrders = function(printfn) {
    return this.db.getAll()
      .then(function(orders) {
        console.log('Track #' + this.TackId + ' has pending orders:')
        var customerIdArray = Object.keys(orders);
        customerIdArray.forEach(function(id) {
          printfn(orders[id]);
        }.bind(this));
      }.bind(this));
  }

  App.Track = Track;
  window.App = App;

})(window);
