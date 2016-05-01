/**
 * Created by hgehlhausen on 1/29/16.
 * @author hgehlhausen
 * stresstrack.directive for my_sheet
 */
(function () {
    stresstrack.$inject = ['SkillService'];
    angular.module('stress')
        .directive('stresstrack', stresstrack);
    function stresstrack (Skills) {
        return {
            restrict : 'EA',
            require  : 'ngModel',
            templateUrl : 'app/modules/stress/stresstrack.view.html',
            link  : link,
            scope : {
                value : '=ngModel',
                trackName : '@',
                boxLength : '=',
                skill     : '@'
            }
        };
        function link (scope,element,attr,ngM) {
            if (!scope.boxLength || Number(scope.boxLength) < 2) {
                scope.length = 2 + Math.ceil(Skills.mgr.getBonus(scope.skill) / 2);
            } else {
                scope.length = Number(scope.boxLength);
            }
            scope.track = [];
            scope.valsArray = [];
            for (var i = 0; i < scope.length; i++) {
                scope.track.push({ idx : i, value : (i+1), highlighted: false});
                scope.valsArray.push(0);
            }
            scope.toggle = function (box) {
                box.highlighted = !box.highlighted;
                scope.valsArray[box.idx] = box.highlighted ? box.value : 0;
                scope.value = scope.valsArray.join('|');
                ngM.$render();
            };

            ngM.$render = function () {
                var value = ngM.$viewValue,
                    parsed = String(value).split('|'),
                    i = 0;
                if (parsed.length > scope.track.length) {
                    for (i = scope.track.length; i < parsed.length; i++) {
                        if (scope.track.length < scope.length) {
                            scope.track.push({ idx : i, value : (i+1), highlighted : false});
                        }
                    }
                }
                for (i = 0; i < parsed.length; i++) {
                    if (i < scope.track.length) {
                        scope.track[i].value = (i+1);
                        scope.track[i].highlighted = (parsed[i] != 0);
                        scope.valsArray[i] = scope.track[i].highlighted ? scope.track[i].value : 0;
                    }
                }
            };

            scope.$watch(
                function watchSkill( scope ) {
                    return ( Skills.getStressTrackSkills()[scope.skill]);
                },
                function handleSkillChange( newValue, oldValue ) {
                    scope.length = 2 + Math.ceil(newValue / 2);
                    ngM.$render();
                }
            );
        }
    }
})();