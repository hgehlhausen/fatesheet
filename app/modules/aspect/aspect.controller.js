/**
 * Created by hgehlhausen on 2/1/16.
 * @author hgehlhausen
 * aspect.controller for fatesheet
 */
(function () {
    angular.module('aspects')
        .controller('aspectSection', aspectSection);

    aspectSection.$inject = ['$scope','$http','aspectmanager'];

    function aspectSection ($scope, $http,aspectmanager) {

        activate(aspectmanager);
        return this;
    }
    function activate (aspectmanager) {
        console.log('activating aspects');
        aspectmanager.add({order : 2, value : 'girl', type : 'highconcept'});
        aspectmanager.add({order : 1, value : 'guy', type : 'trouble'});
        console.log('aspectmanager',aspectmanager);
    }
})();