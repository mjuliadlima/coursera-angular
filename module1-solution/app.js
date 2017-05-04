(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.checkIfTooMuch = function () {
    if (!$scope.dishes) {
      $scope.message = "Please enter data first!";
      $scope.messageStyle={color:'red'};
      $scope.borderStyle={border:'1px solid red'};
      return;
    }
    var numberOfDishes = calculatNumberOfDishes($scope.dishes);
    $scope.messageStyle={color:'green'}
    $scope.borderStyle={border:'1px solid green'};
    if (numberOfDishes <= 3) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too Much!";
    }
  };

  function calculatNumberOfDishes(string) {
    var arrayOfDishes = string.split(",");
    return arrayOfDishes.filter(Boolean).length;
  }
}
})();
