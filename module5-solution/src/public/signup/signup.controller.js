(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'SignUpService'];
function SignUpController(MenuService, SignUpService) {
  var $ctrl = this;
  $ctrl.user = {};

  $ctrl.validateFavoriteDish = function() {
    MenuService.getMenuItem($ctrl.user.favoriteDish)
      .then(function () {
        $ctrl.invalidFavoriteDish = false;
      })
      .catch(function() {
        $ctrl.invalidFavoriteDish = true;
      });
  }

  $ctrl.submit = function() {
    MenuService.getMenuItem($ctrl.user.favoriteDish)
      .then(function(response) {
        $ctrl.invalidFavoriteDish = false;
        $ctrl.submitted = true;
        SignUpService.setInfo($ctrl.user);
      })
      .catch(function() {
        $ctrl.invalidFavoriteDish = true;
      });
    }
};
})();
