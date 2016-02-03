/**
 * Created by hgehlhausen on 2/1/16.
 * @author hgehlhausen
 * aspectslot.directive for fatesheet
 */
(function () {
    angular.module('aspects')
        .directive('aspectSlot',aspectSlot);
    function aspectSlot () {
        return {
            restrict : 'EA',
            link : link,
            templateUrl : 'app/modules/aspect/aspectslot.view.html',
            scope : {
                csModel : '=',
                csForm : '='
            }
        };
        function link (scope,element,attr) {
            scope.label = attr.label;
            scope.showctrl = false && ( scope.label == 'Minor Aspect');
        }
    }
})();