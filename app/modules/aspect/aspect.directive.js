/**
 * Created by hgehlhausen on 2/1/16.
 * @author hgehlhausen
 * aspect.directive for fatesheet
 */
(function () {
    angular.module('aspects')
        .directive('aspectSection',aspectSection);
    function aspectSection () {
        return {
            restrict : 'EA',
            templateUrl : 'app/modules/aspect/aspect.view.html',
            scope : {
                csForm : '='
            }
        };
    }
})();