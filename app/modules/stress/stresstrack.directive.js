/**
 * Created by hgehlhausen on 1/29/16.
 * @author hgehlhausen
 * stresstrack.directive for my_sheet
 */
(function () {
    angular.module('stress')
        .directive('stresstrack', stresstrack);
    function stresstrack () {
        return {
            restrict : 'EA',
            link : link,
            templateUrl : 'app/modules/stress/stresstrack.view.html',
            scope : {
                track : '='
            }
        };
        function link (scope,element,attr,controllers) {
            scope.trackName = attr.trackName;
        }
    }
})();