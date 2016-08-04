angular.module('app.controllers', [])

.controller('mioMuseoCtrl', function($scope, MuseiService) {

  $scope.musei = MuseiService.musei;

  console.log($scope.musei);

})

.controller('museoCtrl', function($scope, MuseiService, id) {

  $scope.id = id;
  $scope.museo = MuseiService.getMuseo(id);

})
