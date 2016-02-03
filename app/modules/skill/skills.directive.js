/**
 * Created by hgehlhausen on 1/26/16.
 * @author hgehlhausen
 */
( function () {
    'use strict';
    angular
        .module('skills')
        .directive('skillblock', skillblock);
    skillblock.$inject = ['SkillService'];
    function skillblock (SkillService) {
        return {
            controller : 'skills.skills',
            link : link,
            templateUrl: 'app/modules/skill/skills.view.html',
            scope: {
                character: '='
            }
        };
        function link (scope,element,attr) {
            scope.$watch(
                function watchCharacterSkills () {
                    return SkillService.mgr.cols;
                },
            function handleCharacterSkillsChange (nVal,oVal) {
                console.log('change detected');
                if (nVal) {
                    scope.rotated = SkillService.generateRotated();
                }
            });
        }
    }
})();