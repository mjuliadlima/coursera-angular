(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.toBuyItems();
  toBuy.bought = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.boughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  // List of items to buy
  var toBuyItems = [
    { name: "strawberry", quantity: 10 },
    { name: "apples", quantity: 5 },
    { name: "bananas", quantity: 3 },
    { name: "pineapples", quantity: 5 },
    { name: "mellow", quantity: 20 }
  ];
  // List of bought items
  var boughtItems = [];

  service.buyItem = function (itemIdex) {
    var item = toBuyItems[itemIdex];
    boughtItems.push(item);
    toBuyItems.splice(itemIdex, 1);
  };

  service.toBuyItems = function () {
    return toBuyItems;
  };

  service.boughtItems = function () {
    return boughtItems;
  };
}

})();
