/**
 * Created by hgehlhausen on 1/28/16.
 * @author hgehlhausen
 */
(function(){
    'use strict';
    angular.module('app')
        .config( configure);

    configure.$inject = ['$stateProvider','$urlRouterProvider'];

    function configure ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state({
                url : '/',
                templateUrl: APP+'app.view.html',
                controller : 'app.main',
                controllerAs : 'Main'
            })
            .state({
                url : '/skill'
            })
    }
})();