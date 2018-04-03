var STRENGTH_LEVEL_SELECTOR = "#strengthLevel";

(function(window){
  'use strinct';

  var App = window.App || {};
  var $ = window.jQuery;

  function formHandler(selector){

    if(!selector){
      throw new Error("No selector provided")
    }

    this.$formElement = $(selector);
    this.$stenghtLevel = $(STRENGTH_LEVEL_SELECTOR);

    this.$stenghtLevel.on('change', function(){
      var currenSrengthLevel = $(this).val();
      if(currenSrengthLevel < 30){
        $('.SrengthLevelTitle').css("color", "#15AC33");
      }else if (currenSrengthLevel > 30 && currenSrengthLevel < 70) {
        $('.SrengthLevelTitle').css("color", "#FFB90D");
      } else {
        $('.SrengthLevelTitle').css("color", "#FF0027");
      }
      $('.SrengthLevelTitle').text(currenSrengthLevel);
    });

    if(this.$formElement.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  formHandler.prototype.loadOrder = function(order){

    $('#'+order.coffeeSize+'Size').prop('checked', 'checked');

    this.$formElement[0].elements[0].value = order.coffee;
    this.$formElement[0].elements[1].value = order.email;
    this.$formElement[0].elements[6].value = order.flavor;
    this.$formElement[0].elements[8].value = order.strength;
    $('.SrengthLevelTitle').text(order.strength);

  }

  formHandler.prototype.addInputValidateHandler = function(inputname, fn, message){
    console.log("setting imput handler for form");
    this.$formElement.on('input', '[name="'+inputname+'"]', function(event){
      var value = event.target.value;

      if(fn(value)){
        event.target.setCustomValidity('');
      }else
      {
        event.target.setCustomValidity(message);
      }
    })
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



      if(!needAchievementGift(data))
      {
        console.log(data);
        
        fn(data)
          .then(function(){
            this.reset();
            $('.SrengthLevelTitle').text("0");
            this.elements[0].focus();
          }.bind(this));

      }else{
        $('#MyModal').modal('toggle')
          .on('hidden', function(){
        });

        $('#Confirm').on('click', function(event){
          $(".hiddengift").removeClass("hiddengift")
              .addClass("form-group");
        })

        $('#Cancel').on('click', function(event){
          fn(data);
          this.reset();
          $('.SrengthLevelTitle').text("0");
          this.elements[0].focus();
        }.bind(this))
      }
    });
  };


  function needAchievementGift(data){
    if((data.size == "coffeZilla" && data.strength > 90)
        && $('#AchievementGift').val() == "")
    {
      return true;
    }
    return false;
  }

  App.FormHandler = formHandler;
  window.App = App;

})(window)
