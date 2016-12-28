 (function() {
     function config($stateProvider, $locationProvider) {
         $locationProvider
            .html5Mode({
                enable: true,
                requireBase: false
         });
         $stateProvider
            .state('landing', {
                url: '/',
                //why does upper url does not have landing? where below album and collection we add album and collection?
                templateUrl:'/templates/landiing.html'
         })
            .state('album', {
                url: '/album',
                templateUrl:'/templates/album.html'
         })
            .state('collection', {
                url: '/collection',
                templateUrl:'/templates/collection.html'
         });
     }
 
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();
