/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function (){
    console.log('main controller load');
    angular.module('app')
        .controller('app.main',main);
    main.$inject = ['$scope','$http','CharacterService'];
    function main ($scope,$http, Character) {
        var sheet = this;
        $scope.title = 'Fate Core Sheet';
        $scope.setting = 'Dresden Files';
        $scope.doSave = doSave;
        $scope.doLoad = doLoad;

        $scope.stresstest = '0|1|2|0|4';

        activate();
        return sheet;

        function activate () {
            //Async to allow other libraries to be done after this "activates"
            setTimeout(function () {
                doLoad();
            },1);
        }

        function doSave () {
            Character.save($scope.charactersheet);
        }
        function doLoad () {
            Character.load($scope.charactersheet);
        }
    }
})();