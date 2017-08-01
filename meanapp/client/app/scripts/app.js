'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000');//connects to database through serverside rest api end point.
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'/* ,
        controllerAs: 'main' */
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'/* ,
        controllerAs: 'movies' these are only needed for nested views */
      })
      .when('/create/movie', {
        templateUrl: 'views/movie-add.html',
        controller: 'MovieAddCtrl'/* ,
        controllerAs: 'movieAdd' */
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl'/*,
        controllerAs: 'movieView'*/
      })
      .when('/movie/:id/delete', {
        templateUrl: 'views/movie-delete.html',
        controller: 'MovieDeleteCtrl'/*,
        controllerAs: 'movieDelete'*/
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl'/*,
        controllerAs: 'movieEdit'*/
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('');

    // .when('/about', {
    //   templateUrl: 'views/about.html',
    //   controller: 'AboutCtrl',
    //   controllerAs: 'about'
    // })
  }).factory('MovieRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setFullResponse(true);
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  }).factory('Movie', function(MovieRestangular) {
    return MovieRestangular.service('movie');
  }).directive('youtube', function() {
    return {
      restrict: 'E',
      scope: {
        src: '='
      },
      templateUrl: 'Views/youtube.html'
    };
  }).filter('trusted', function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
