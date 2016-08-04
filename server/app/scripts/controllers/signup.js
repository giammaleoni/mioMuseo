'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('SignupCtrl', function($scope, $location, DB, $firebaseObject) {

    $scope.user;
    $scope.password;
    $scope.nick;

    $scope.submit = function(action) {
      if ($scope.user && $scope.password && $scope.nick) {
        DB.createUser(user, password, nick);
      }
      return false;
    }

  });
