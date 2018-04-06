(function(window) {
  'use strict';

  var App = window.App || {};
  var OfflineDB = App.DataStore;


  function Track(trackId, db) {
    this.TackId = trackId;
    this.db = db;
    this.offlineDb = new OfflineDB();
    this.offlineDeletedOrders = new OfflineDB();
  }

  Track.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order)
      .then(
        function() {
          var offlineOrders = this.offlineDb.getAll()
            .then(function(orders) {
              for (var key in orders) {
                this.db.add(key, orders[key]);
              }
            }.bind(this))
        }.bind(this),
        function(prom) {
          var deferred = $.Deferred();
          deferred.resolve(this.offlineDb.add(order.emailAddress, order));
          return deferred;
        }.bind(this))

  }

  Track.prototype.deliverOrder = function(customerId) {
    return this.db.remove(customerId)
      .then(function() {
        this.offlineDeletedOrders.getAll()
          .then(function(orders) {
            for (var id in orders) {
                this.db.remove(id);
              }
            }.bind(this))
        console.log('Delivering order for ' + customerId);
      }.bind(this), function() {
        var deferred = $.Deferred();

        this.offlineDb.get(customerId)
          .then(function(order) {
            if (order == null) {
              this.offlineDeletedOrders.add(customerId);
            }
          }.bind(this))
          
        deferred.resolve(this.offlineDb.remove(customerId));
        return deferred;
      }.bind(this))
  }

  Track.prototype.printOrders = function(printfn) {
    return this.db.getAll()
      .then(function(orders) {
          console.log('Track #' + this.TackId + ' has pending orders:')
          var customerIdArray = Object.keys(orders);
          customerIdArray.forEach(function(id) {
            printfn(orders[id]);
          }.bind(this));
        }.bind(this),
        function() {
          console.log('Track #' + this.TackId + ' has pending orders:')
          return this.offlineDb.getAll()
            .then(function(orders) {
              var customerIdArray = Object.keys(orders);
              customerIdArray.forEach(function(id) {
                printfn(orders[id]);
              }.bind(this))
            })
        }.bind(this));
  }

  App.Track = Track;
  window.App = App;

})(window);
