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

        return sheet;
        function doSave () {
            console.log('save!');
            Character.save();
        }
        function doLoad () {
            console.log('load!');
            Character.load();
        }
    }
})();