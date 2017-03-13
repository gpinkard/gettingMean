(function () {

  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'About Loc8r',
    };
    vm.main = {
      content: 'Loc8r was created to help people find places to sit down and get a bit of work done. Nulla eleifend, augue vitae tempus ullamcorper, augue dui gravida urna, pulvinar gravida lectus nulla non arcu. Nulla laoreet lacus purus.'
    };
  }
}) ();
