/**
 * Created by hgehlhausen on 2/1/16.
 * @author hgehlhausen
 * character.directive for fatesheet
 */
(function () {
    angular.module('character')
        .directive('charactername', charactername);
    function charactername () {
        return {
            restrict : 'EA',
            templateUrl : 'app/modules/character/character.view.html'
        }
    }
})();