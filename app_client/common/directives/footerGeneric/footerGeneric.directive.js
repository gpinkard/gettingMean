(function () {

  angular
    .module('loc8rApp')
    .directive('footerGeneric', footerGeneric)

  function footerGeneric () {
    return {
      restrict: 'EA',
      templateUrl: '/common/footerGeneric/footerGeneric.template.html'
    };
  }
}) ();
