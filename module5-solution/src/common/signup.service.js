(function () {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);


SignUpService.$inject = [];
function SignUpService() {
  var service = this;

  service.setInfo = function (info) {
    service.info = info;
  };

  service.getInfo = function() {
    return service.info;
  }
};

})();
