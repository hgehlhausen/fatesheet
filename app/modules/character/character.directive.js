/**
 * Created by hgehlhausen on 2/1/16.
 * @author hgehlhausen
 * character.directive for fatesheet
 */
(function () {
    angular.module('character')
        .directive('charactername', charactername);
    charactername.$inject = ['CharacterService'];
    function charactername (CharacterService) {
        return {
            restrict : 'EA',
            //link : link,
            //scope : {},
            templateUrl : 'app/modules/character/character.view.html'
        };
        function link (scope,element,attr) {
            scope.$watch(
                function watchCharacterName () {
                    return CharacterService.name;
                },
                function handleCharacterNameChange (nVal,oVal) {
                    scope.name = nVal;
                }

            );
            scope.$watch(
                function watchCharacterName () {
                    return CharacterService.description;
                },
                function handleCharacterNameChange (nVal,oVal) {
                    scope.description = nVal;
                }
            );
        }
    }
})();