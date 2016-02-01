/**
 * Created by hgehlhausen on 1/26/16.
 * @author hgehlhausen
 */
( function () {
    'use strict';
    angular
        .module('skills')
        .directive('skillblock', skillblock);
    function skillblock () {
        return {
            controller : 'skills.skills',
            templateUrl: 'app/modules/skill/skills.view.html',
            scope: {
                character: '='
            }
        }
    }
})();