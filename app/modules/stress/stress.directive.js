/**
 * Created by hgehlhausen on 1/26/16.
 * @author hgehlhausen
 */
(function() {
    angular
        .module('stress')
        .directive('stress', stress);
    stress.$inject = ['Stress','SkillService'];
    function stress (Stress,Skills) {
        console.log('activating');
        return {
            restrict : 'EA',
            link : link,
            scope : {},
            templateUrl : 'app/modules/stress/stress.view.html',
            controller : 'stressCtrl'
        };
        function link (scope,element,attr,controller) {
            scope.$watch(
                function watchWill( scope ) {
                    // Return the "result" of the watch expression.
                    return( Stress.mental.boxes );
                },
                function handleWillChange( newValue, oldValue ) {
                    scope.mental = newValue;
                }
            );
            scope.$watch(
                function watchPhysique( scope ) {
                    return (Stress.physical.boxes);
                },
                function handlPhysqueChange (nVal,oVal) {
                    scope.physical = nVal;
                }
            )
        }
    }
})();