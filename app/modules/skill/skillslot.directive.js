/**
 * Created by hgehlhausen on 1/27/16.
 * @author hgehlhausen
 */
(function () {
    angular.module('skills')
        .directive('skillslot', skillslot);
    function skillslot () {
        var fn = link;
        return {
            controller : 'skills.skillslot',
            link  : fn,
            templateUrl : 'app/modules/skill/skillslot.view.html',
            scope : {
                ds : '=skill',
                //skills : '=',
                column : '=',
                //name   : '=',
                //value  : '='
            }
        };
        function link (scope,element,attr, controller) {
            if (!scope.column) {
                console.log("warning, no column defined");
            }
            //scope.skillObj = scope.column.skills[scope.column.indexOfSkill(scope.ds.skill)];
        }
    }
})();