(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  // narrowIt
  controller.narrowIt = function() {
    if (controller.searchTerm===undefined || controller.searchTerm.trim()==="") {
      controller.items = [];
    } else {
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promise.then(function(response) {
        controller.items = response;
      })
      .catch(function(error) {
        console.log("Something went wrong", error);
      });
    }
  };

  // removeItem
  controller.removeItem = function(index) {
      controller.items.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var matchedItems = [];
  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        var items = result.data.menu_items;
        matchedItems = items.filter(function (item) {
          return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        });
        return matchedItems;
      });
  }
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
  }
}
})();
