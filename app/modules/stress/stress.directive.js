/**
 * Created by hgehlhausen on 1/26/16.
 * @author hgehlhausen
 */
(function() {
    stress.$inject = ['Stress','SkillService'];
    angular
        .module('stress')
        .directive('stress', stress);
    function stress (Stress,Skills) {
        return {
            restrict : 'EA',
            link : link,
            scope : {
                csForm : '='
            },
            templateUrl : 'app/modules/stress/stress.view.html',
            controller : 'stressCtrl'
        };
        function link (scope,element,attr,controller) {

        }
    }
})();