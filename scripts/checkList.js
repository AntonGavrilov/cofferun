var CHECKLIST = '[data-coffee-order="checklist"]';
var DATA_ORDER_BLACKING_CLASS = 'data-coffee-order-blacking';

(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('no selector provided');
    }

    this.timeoutId = "";
    this.$element = $(selector);
    if (this.$element.length == 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addRow = function(coffeeOrder) {
    var rowElement = new Row(coffeeOrder);
    this.removeRow(coffeeOrder.EmailAddress);
    this.$element.append(rowElement.$element);
  }

  CheckList.prototype.removeRow = function(Emailaddress) {
    this.$element
      .find('[value="' + Emailaddress + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  }

  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      event.preventDefault();

      var email = event.target.value;

      fn(email)
        .then(function() {
          this.timeoutId = setTimeout(function() {

            this.$element
              .find('[value="' + email + '"]')
              .closest('[data-coffee-order="checkbox"]')
              .addClass(DATA_ORDER_BLACKING_CLASS);

            setTimeout(function() {
              this.removeRow(email);
            }.bind(this), 500)
          }.bind(this), 300)
        }.bind(this));
    }.bind(this))
  }

  CheckList.prototype.addDbClickHandler = function(fn) {
    this.$element.on('dblclick', 'input', function(event) {
      event.preventDefault();

      clearTimeout(this.timeoutId);
      clearTimeout(this.timeoutId - 1);

      var data = {

        email: $(event.target).attr('value'),
        coffee: $(event.target).attr('coffee'),
        coffeeSize: $(event.target).attr('coffeeSize'),
        flavor: $(event.target).attr('flavor'),
        strength: $(event.target).attr('strength')
      }
      fn(data);
    }.bind(this))
  }


  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox',
    });

    addRowColor(coffeeOrder, $div);

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
      flavor: coffeeOrder.flavor,
      coffeeSize: coffeeOrder.size,
      coffee: coffeeOrder.coffee,
      strength: coffeeOrder.strength
    });

    var description = '[' + coffeeOrder.strength + 'x]';


    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor;
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;

})(window);

function addRowColor(order, element) {

  switch (order.flavor) {
    case "caramel":
      element.css("background-color", "#fbd18d");
      break;
    case "almond":

      element.css("background-color", "#e5cfb8");
      break;
    case "mocha":
      element.css("background-color", "#e8fff4");
      break
    default:
  }
}
