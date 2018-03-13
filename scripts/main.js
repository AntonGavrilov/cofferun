(function (window){
  'use strict';

var FORM_SELECTOR = '[data-coffee-order = "form"]';
var STRENGTH_LEVEL_SELECTOR = "#strengthLevel";
var STRENGTH_LEVEL_TITLE_SELECTOR = '.strengthTitle';
var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

var App = window.App;
var Track = App.Track;
var DataSource = App.DataStore;
var FormHandler = App.FormHandler;
var CheckList = App.CheckList;
var Validation = App.Validation;
var MyTruck = new Track('nnc-1701', new DataSource());
var remote = new RemoteDataSore("test");

var formHandler = new FormHandler(FORM_SELECTOR);

var checkList = new CheckList(CHECKLIST_SELECTOR);

checkList.addClickHandler(MyTruck.deliverOrder.bind(MyTruck));
checkList.addDbClickHandler(formHandler.loadOrder.bind(formHandler));

formHandler.addSubmitHandler(function(data){
  MyTruck.createOrder.call(MyTruck, data);
  checkList.addRow.call(checkList, data);
});

formHandler.addInputValidateHandler("EmailAddress",
                                    Validation.isCompanyEmail,
                                    "Not autorized email adress");

formHandler.addInputValidateHandler("coffee",
                                    Validation.validateStrength,
                                    "Not valid strength or coffee");

formHandler.addInputValidateHandler("strength",
                                    Validation.validateStrength,
                                    "Not valid strength or coffee");

window.MyTrack = MyTruck;
})(window)
