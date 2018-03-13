(function(window){
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function modalHandler(selector){

    if(!selector){
      throw new Error("No selector provided")
    }

    this.$modalHandler = $(selector);

    if(this.$modalHandler.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  formHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};

      $(this).serializeArray().forEach(function(item){
        if(!data[item.name])
          data[item.name] = item.value;
      });

      fn(data);

      if(needAchievementGift(data))
      {
        $('#MyModal').modal('toggle');
      }


      this.reset();
      this.elements[0].focus();
      console.log(data);
    })
  };


  App.modalHandler = modalHandler;

  window.App = App;

})(window)

function needAchievementGift(data){

  if(data.size == "coffeZilla" && data.strength > 90)
  {
    return true;
  }

  return false;
}
