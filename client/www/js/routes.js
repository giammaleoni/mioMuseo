angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app.mioMuseo', {
    abstract: true,
    url: '/musei',
    views: {
      musei: {
        template: '<ion-nav-view></ion-nav-view>'
      }
    }
  })

  .state('app.musei.index', {
    url: '',
    templateUrl: 'templates/mioMuseo.html',
    controller: 'mioMuseoCtrl'
  })

  .state('app.musei.museo', {
    url: '/:id',
    templateUrl: 'templates/museo.html',
    controller: 'museoCtrl',
    resolve: {
      id: function($stateParams, MuseiService) {
        return MuseiService.getMuseo($stateParams.id);
      }
    }
  });

$urlRouterProvider.otherwise('/musei')



});
