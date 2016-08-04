'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'firebase',
    'ngRepeatReorder',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.edit',
    'ui.grid.resizeColumns'
  ])
  .run(function(DB) {
    //Registro all'avvio dell'applicazione un wathc sull'autenticazione
    DB.registerOnAuth();

  })

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          parent: 'base',
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html'
          })
          .state('profile', {
            url: '/profile',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/profile.html'
          });

  });
