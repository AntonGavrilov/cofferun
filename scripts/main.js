(function (window){
  'use strict';

var FORM_SELECTOR = '[data-coffee-order = "form"]';
var STRENGTH_LEVEL_SELECTOR = "#strengthLevel";
var STRENGTH_LEVEL_TITLE_SELECTOR = '.strengthTitle';
var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
var SERVIER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
var App = window.App;
var Track = App.Track;
var DataSource = App.DataStore;
var FormHandler = App.FormHandler;
var CheckList = App.CheckList;
var Validation = App.Validation;
var RemoteDataStore = App.RemoteDataStore;
var remoteDS = new RemoteDataStore(SERVIER_URL);
var MyTruck = new Track('nnc-1733', remoteDS);

var formHandler = new FormHandler(FORM_SELECTOR);

var checkList = new CheckList(CHECKLIST_SELECTOR);

checkList.addClickHandler(MyTruck.deliverOrder.bind(MyTruck));
checkList.addDbClickHandler(formHandler.loadOrder.bind(formHandler));

formHandler.addSubmitHandler(function(data){
  return MyTruck.createOrder.call(MyTruck, data)
    .then(function(){
      checkList.addRow.call(checkList, data);
    }
  );
});

formHandler.addInputValidateHandler("emailAddress",
                                    Validation.isCompanyEmail,
                                    "Not autorized email adress");

formHandler.addInputValidateHandler("coffee",
                                    Validation.validateStrength,
                                    "Not valid strength or coffee");

formHandler.addInputValidateHandler("strength",
                                    Validation.validateStrength,
                                    "Not valid strength or coffee");

MyTruck.printOrders(checkList.addRow.bind(checkList));

window.MyTrack = MyTruck;
})(window)
